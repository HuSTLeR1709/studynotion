import React from 'react'
import HighlightText from '../HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAbutton from './CTAbutton'

const LearningLanguageSection = () => {
  return (
    <div>
        <div className=' flex flex-col gap-5 items-center justify-center my-[120px] '>
        <div className='text-5xl font-bold'>
         Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <div className='text-xl w-[70%] text-center font-semibold text-richblack-700'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-7'>
        <img 
            src={know_your_progress}
            alt='knowyourprogress'
            className='object-contain -mr-32'
        />
        <img 
            src={compare_with_others}
            alt='knowyourprogress'
            className='object-contain'
        />
        <img 
            src={plan_your_lessons}
            alt='knowyourprogress'
            className='object-contain -ml-32'
        />

        </div>
        <div>
            <CTAbutton active={true} linkto={"/signup"} children={"Learn More"}/>
        </div>

        </div>

    </div>
  )
}

export default LearningLanguageSection