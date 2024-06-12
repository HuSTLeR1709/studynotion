import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelinelogo from '../../../assets/Images/TimelineImage.png'
const timeline = [
    {
        Logo: Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"

    },
    {
        Logo: Logo2,
        heading:"Resposibility",
        Description:"Students will always be our top priority"

    },
    {
        Logo: Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"

    },
    {
        Logo: Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"

    },

]

const TimelineSection = () => {
  return (
    <div>
    <div className='flex flex-row gap-15 items-center mt-9 mx-auto'>
    <div className='w-[45%] flex flex-col gap-2'>
    {
        timeline.map( (element, index) => {
            return (
                <>
                <div className='flex flex-row gap-5 items-center ' key={index}>

                <div className='w-[50px] h-[50px] flex items-center bg-white rounded-full justify-center'>
                <img src={element.Logo} alt='Logoimage'/>

                </div>

                <div>
                    <h2 className='font-bold text-sm'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                </div>

                




            </div>
             <div className='border-2 border-richblack-500 w-[2px] h-12 ml-5'>

                </div>
                
                </>
            
            )
        })
    }


    </div>

    <div className='relative  shadow-blue-100'>
    <img src={timelinelogo} alt='timelinelogo'/>
    <div className='absolute uppercase bg-caribbeangreen-700 text-white flex flex-row py-8 left-[50%] translate-x-[-50%] translate-y-[-50%]'>

        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
            <p className='text-3xl font-bold'>10</p>
            <p className='text-sm text-caribbeangreen-300'>Years of experience</p>
        </div>

        <div className='flex flex-row gap-5 items-center px-7'>
        <p className='text-3xl font-bold'>250</p>
            <p className='text-sm text-caribbeangreen-300'>Types of courses</p>

        </div>
    </div>
    </div>

    </div>

    </div>
  )
}

export default TimelineSection