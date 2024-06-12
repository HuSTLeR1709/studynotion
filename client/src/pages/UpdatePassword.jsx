import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { useLocation } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword:""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {loading} = useSelector((state)=>state.auth)
    const {password, confirmPassword} = formData; 
    
    const handleOnChange = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        )
        )
        }
    
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
    
  return (
    <div className='text-white flex items-center justify-center h-screen'>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='flex flex-col gap-5'>
                <h1 className='text-3xl'>
                    Choose new Password
                </h1>
                <p className='text-richblack-100'>
                Almost done. Enter your new password and youre all set.
                </p>
                <form onSubmit={handleOnSubmit}>
                    <label>
                        <p className='mb-3'>New Password * </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='w-full mb-8 rounded bg-richblack-800 p-2 border-b-2 border-richblack-300'
                            autoComplete='new-password'
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-[560px] top-[352px] z-[10] cursor-pointer'>
                        {
                            showPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                        }

                        </span>
                    </label>

                    <label>
                        <p className='mb-3 rounded'>Confirm New Password*</p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='w-full mb-8 rounded bg-richblack-800 p-2 border-b-2 border-richblack-300'
                            autoComplete='new-password'
                        />
                        <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className='absolute right-[560px] top-[462px] z-[10] cursor-pointer'>
                        {
                            showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>
                        }

                        </span>
                    </label>
                    <br/>

                    <button type='submit' className='bg-yellow-50 w-full mt-9 text-richblack-900 rounded p-2'>
                        Reset Password
                    </button>
                </form>
                <div>
                <Link to='/login'>
                    <button>Back to login</button>
                </Link>
                    
                </div>

                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword