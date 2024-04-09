const Profile = require("../models/Profile");
const User = require("../models/User");
const imageUploadToCloudinary = require("../utils/imageUploader")
require("dotenv").config()

exports.updateProfile = async (req, res) => {
	try {
	  const {
		firstName = "",
		lastName = "",
		dateOfBirth = "",
		about = "",
		contactNumber = "",
		gender = "",
	  } = req.body
	  const id = req.user.id
  
	  // Find the profile by id
	  const userDetails = await User.findById(id)
	  const profile = await Profile.findById(userDetails.additionalDetails)
  
	  const user = await User.findByIdAndUpdate(id, {
		firstName,
		lastName,
	  })
	  await user.save()
  
	  // Update the profile fields
	  profile.dateOfBirth = dateOfBirth
	  profile.about = about
	  profile.contactNumber = contactNumber
	  profile.gender = gender
  
	  // Save the updated profile
	  await profile.save()
  
	  // Find the updated user details
	  const updatedUserDetails = await User.findById(id)
		.populate("additionalDetails")
		.exec()
  
	  return res.json({
		success: true,
		message: "Profile updated successfully",
		updatedUserDetails,
	  })
	} catch (error) {
	  console.log(error)
	  return res.status(500).json({
		success: false,
		error: error.message,
	  })
	}
  }
  

exports.deleteAccount = async (req,res) =>{
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in deleting Account"
        })
        
    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.getEnrolledCourses=async (req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const enrolledCourses = await User.findById(id).populate({
			path : "courses",
				populate : {
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
         console.log(enrolledCourses);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
	try {

	const id = req.user.id;
  
    console.log("User id",id)
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await imageUploadToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) { 
        console.log(error)
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}