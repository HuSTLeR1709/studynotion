import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { updatePassword } from '../../../../services/operations/profileAPI'

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const token = useSelector((state)=> state.auth.token)


//   const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePassword = (e) => {
    e.preventDefault()
    const {newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword) {
      updatePassword(token,password);
    } else {
      alert("Password does not match")
    }
  }
  return (

    <form onSubmit={handlePassword}>
        <div className=' bg-richblack-700 p-7 rounded-lg flex gap-7 flex-col'>
    <div>
        <h1 className='text-xl text-white'>Update Password</h1>
    </div>
    <div className="flex gap-x-4">
    <div className=' relative'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Old Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showPassword ? "text" : "password"}
                                       name="oldPassword"
                                       value={password.oldPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                <div className=' relative'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="newPassword"
                                       value={ password.newPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleOnChangePassword}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-3"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>

    </div>
    </form>
    
  )
}

export default UpdatePassword