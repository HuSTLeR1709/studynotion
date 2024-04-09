import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation/CourseInformation'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse'

const RenderStpes = () => {
    const {step} = useSelector((state)=>state.course)

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]
  return (
    <div className=' flex flex-col'>
    <div className='flex h-[100px] items-center gap-20'>
        {
            steps.map((items)=>{
                return <>
                <div className='flex'>
                    <div className=' flex'>
                            <div className={`h-[50px] p-3 px-5 rounded-full ${step === items.id ? " bg-yellow-900 text-yellow-50 border-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300 "} `}>
                                {
                                    step > items.id ? (<FaCheck className='text-yellow-50'/>) : (items.id)
                                }
                            </div>
                </div>
                
                            
                </div>
                {
                    items.id <3 ? (<div className='border-[2px] border-white border-dashed transform h-[150px] rotate-90'></div>) : (<div></div>)
                }
                

                </> 
                
            })
        }
    </div>

    

    <div className='flex  mr-3 ml-1 gap-28'>
        {
            steps.map((item)=>{
                return <div className='text-sm'>
                    <p>{item.title}</p>
                </div>
            })
        }
    </div>
        {step === 1 && <CourseInformation/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}

    </div>
  )
}

export default RenderStpes