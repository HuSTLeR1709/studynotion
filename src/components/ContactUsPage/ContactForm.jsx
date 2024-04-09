import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data)=> {
        console.log("Logging Data->",data)
        try {
            setLoading(true);
            const response = {status:"OK"} ; 
            console.log("Logging Response",response)
            setLoading(false)

            
        } catch (error) {
            console.log("Error",error.message);
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneno:""
            })
        }

    },[reset,isSubmitSuccessful])
  return (
    <form onSubmit={handleSubmit(submitContactForm)}> 

    <div className='flex gap-5 flex-col'>
    <div className='flex gap-3'>
       {/* FirstName */}
    <div className='flex flex-col gap-2'>
        <lable htmlFor='firstname'>First Name</lable>
        <input
        className='bg-richblack-400 rounded-sm p-1'
            type='text'
            name='firstname'
            id='firstname'
            placeholder='Enter First Name'
            {...register("firstname", {required:true}) }

        /> 
        {
            errors.firstname && (
                <span className='text-pink-200 text-xs'>
                    Please Enter your Name
                </span>
            )
        }
    </div>
    {/* LastName */}
    <div className='flex flex-col gap-2'>
    <lable htmlFor='lastname'>Last Name</lable>
        <input
        className='bg-richblack-400 rounded-sm p-1'
            type='text'
            name='lastname'
            id='lastname'
            placeholder='Enter First Name'
            {...register("lastname") }

        /> 
    </div> 
    </div>
    

    {/* Email */}
    <div className='flex flex-col gap-2'>
    <lable htmlFor='email'>Email</lable>
        <input
        className='bg-richblack-400 rounded-sm p-1'
            type='email'
            name='email'
            id='email'
            placeholder='Enter your Email'
            {...register("email", {required:true}) }

        />  
        {
            errors.email && (
                <span className='text-pink-200 text-xs'>
                    Please enter your Email
                </span>
            )
        }
    </div>

    {/* PhoneNo */}
    <div className='flex flex-col gap-2'>
    <lable htmlFor='phoneno'>Phone Number</lable>
    <div className='flex flex-row gap-5'>
    {/* dropdown */}
            
                <select className='bg-richblack-400 rounded-sm p-1 w-[90px]'
                name='dropdown'
                id='dropdown'
                {...register("countrycode",{required:true})}
                >
                {
                    CountryCode.map((element,index)=>{
                        return <option key={index} value={element.code} className='bg-richblack-400 rounded-sm p-1'>
                        {element.code}-{element.country}     

                        </option>
                    })
                }

                </select>
          

            {/* Number */}

           
                <input
                className='bg-richblack-400 rounded-sm p-1 w-[calc(100%-100px)]'
                type='number'
                    id='phonenumber'
                    name='phonenumber'
                    {...register("phoneno",{required:{value:true, message:"Please enter phone number "} 
                    , maxLength:{value:10,message:"Enter valid phone Number"}, 
                    minLength:{value:8,message:"Enter valid phone Number"}})}

                />

                
       

    </div>
    {
                    errors.phoneno && (
                        <span className='text-xs text-pink-200'>
                            Please Enter your Mobile Number
                        </span>
                    )
                }
        

    </div>

    {/* message */}
    <div className='flex flex-col gap-2'>
    <lable htmlFor='message'>Message</lable>
        <textarea
        className='bg-richblack-400 rounded-sm p-1'
            cols='30'
            rows='7'
            name='message'
            id='message'
            placeholder='Enter your message'
            {...register("message", {required:true}) }

        />  
        {
            errors.message && (
                <span className='text-pink-200 text-xs'>
                    Please enter your message
                </span>
            )
        }
    </div>

        <div>
            <button type='submit' className='bg-yellow-25 text-richblack-900 w-full p-2 rounded-md'>
                Send Message
            </button>
        </div>


    </div>

         
    </form>
  )
}

export default ContactForm