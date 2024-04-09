const { default: mongoose } = require("mongoose")
const {instance} = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")


//capture payment

// exports.capturePayment = async (req,res)=>{
//     const {courses} = req.body;
//     const userId = req.user.id;

//     if(courses.length === 0){
//         return res.json({status:false, message:"Please provide course Id"})
//     }
// }


exports.capturePayment = async (req,res)=>{
    
        const {courseId} = req.body;
        const userId = req.user.id;
        if(!courseId || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        let course;
        try {
            course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"No course found",
            })
        }
        
        const uid =  mongoose.Types.ObjectId(userId);

        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled for this course"
            })

        }
    } 
        
        catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in enrolling in the course"
            })
        }

        const amount = course.price;
        const currency = "INR";
         
        const options = {
            price: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId:course._id,
                userId,

            }}

            

        
        try {
            const paymentresponse = await instance.orders.create(options);
            console.log(paymentresponse)
            return res.status(200).json({
                success:true,
                message:"Created order successfully",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderid:paymentresponse.id,
                currency:paymentresponse.currency,
                amount:paymentresponse.amount,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"Could not initiate order"
            })
        }
}       


exports.verifySignature = async (req,res)=>{
    const webhooksecret= "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhooksecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    
    if(digest === signature){
        console.log("Payment is Authorised")
        
        const  {courseId, userId} = req.body.payload.payment.entity.notes;

    try {
        const course = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    studentEnrolled:userId,

                }
            },
            {new:true})
            if(!course){
                return res.status(500).json({
                    success:false,
                    message:"Error in finding course"

                })
            }

            console.log(course);

            const user = await User.findByIdAndUpdate({_id:userId},
                {
                    $push:{
                        courses:courseId,
                    }
                },
                {new:true})

                console.log(user);

                const emailResponse = await mailSender(user.email, "Congratulations from Study Notion", "Congratulations you have succesfully registered for the course")

                return res.status(200).json({
                    success:true,
                    message:"Signature Verified"
                })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
    }

    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request"
        })
    }


    


};
    
