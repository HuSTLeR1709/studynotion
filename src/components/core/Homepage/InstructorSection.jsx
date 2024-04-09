import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from '../HighlightText'
import CTAbutton from './CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className= 'w-11/12 flex flex-row items-center justify-around mt-9'>
    <div className='w-[30%]'>
       <img
        src={Instructor}
        alt='InstructorImage'
    /> 
    </div>
    <div className='flex flex-col w-[40%] gap-10 items-start'>
        <p className='text-5xl'>Become  <HighlightText text={"an instructor"}/></p>
        <p>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <CTAbutton active={true} linkto={"/signup"} >
        <div className='flex gap-3 items-center'>
            <p>Start Teaching Today</p>
            <FaArrowRight/>
        </div>
            
        </CTAbutton>
    </div>
    

    </div>


  )
}

export default InstructorSection
