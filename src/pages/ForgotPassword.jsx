import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import { setProgress } from '../slices/loadingBarSlice'


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const {loading} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
        

    }
  return (
    <div className='text-richblack-25 flex items-center justify-center h-screen  flex-col'>

    {
        loading ?(
            <div>
                Loading..
            </div>
        ) : (
            <div className='flex flex-col w-1/4 gap-4'>
               <h1 className='text-2xl font-bold'>
            {
                !emailSent ? "Reset Your Password" : "Check your Email"
             }
                 
            </h1> 
            <p className='text-xl'>
                {
                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to your email ${email}`
                }
            </p>

            <form onSubmit={handleOnSubmit} className='flex flex-col gap-6' >
                {
                    !emailSent && (
                        <label>
                            <p>Email Address *</p>
                            <input
                                required
                                type='email'
                                name='email'
                                placeholder='Enter your Email Address'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className='w-full text-richblack-800'
                            />
                            <br/>
                        </label>
                        
                    )
                }
                <button  onClick={()=>{dispatch(setProgress(60))}} className='w-full font-bold bg-yellow-25 text-richblack-800 ' type='submit'>
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
            </form>

            <div>
                <Link to='/login'>
                    <p>Back to Login</p>
                </Link>
            </div>
            </div>
            
            
        )

    }

    </div>
  )
}

export default ForgotPassword