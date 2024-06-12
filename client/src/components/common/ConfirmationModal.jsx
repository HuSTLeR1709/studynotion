import React from 'react'
import IconBtn from './IconBtn'
const ConfirmationModal = ({modalData}) => {
  return (
    <div>
    <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col gap-3'><p className='text-xl text-pink-200'>{modalData.text1}</p>
        <p className='text-richblack-25'>{modalData.text2}</p></div>
        
        <div className='flex justify-between mt-4 text-pink-200'>
            <IconBtn
            onclick={modalData?.btn1Handeler}
            text={modalData?.btn1Text}
            > </IconBtn>
            <IconBtn
            onclick={modalData?.btn2Handeler}
            text={modalData?.btn2Text}
            >

            </IconBtn>

            
        </div>
    </div>
        

    </div>
  )
}

export default ConfirmationModal