import React from 'react'

const CourseCard = ({carddata}) => {
  return (
    <div className={` flex flex-col w-[360px]  gap-1 p-3 bg-richblack-800 mt-6 `}>
    <div className='flex flex-col border-b-2 border-dashed border-richblack-100 p-5 px-2 '>
    <div className={` font-bold text-xl text-left p-2 mb-2`}>
        {carddata.heading}
    </div>
    <div className='text-richblack-300 mb-6 text-base h-[100px]'>
        {carddata.description}
    </div>

    </div>
    <div className='flex justify-between text-richblack-300 p-3  mt-2'>
    <p>{carddata.level}</p>
    <p>{carddata.lessons}Lessons</p>

    </div>

    </div>
  )
}

export default CourseCard