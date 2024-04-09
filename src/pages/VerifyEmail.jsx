import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp, signUp } from '../services/operations/authAPI'

const VerifyEmail = () => {
    const {signupData,loading} = useSelector((state)=> state.auth)
    const [otp,setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleOnSubmit=(e)=>{
            e.preventDefault();
            const {
                accountType,
                firstName,
                lastName,
                 email,
                password,
                confirmPassword

            } = signupData;

            dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
  return (
    <div className='text-white h-screen flex justify-center items-center'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className=' flex flex-col gap-4 items-center'>
                    <h1 className='text-4xl'>
                        Verify Email
                    </h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col items-center w-1/4'>
                    <OTPInput
  numInputs={6}
  value={otp}
  onChange={setOtp}
  renderSeparator={<span>-</span>}
  renderInput={(props, index) => (
    <input
      {...props}
      className='p-4 bg-richblack-600 w-1/4'
      style={{ color: otp[index] ? 'white' : 'black' }}
    />
  )}
/>

                            
                    <button type='submit' className='w-full bg-yellow-25 p-2 text-richblack-900 mt-7'>
                        Verify Email
                    </button>
                    </form>
                    
                <div className='flex items-center justify-between'>
                    
                <Link to='/login'>
                    <button>Back to login</button>
                </Link>
                    <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                        Resend OTP
                    </button>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail