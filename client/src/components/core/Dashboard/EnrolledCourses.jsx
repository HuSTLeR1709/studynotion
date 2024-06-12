import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import {useNavigate} from 'react-router-dom'

const EnrolledCourses = () => {
    const token = useSelector((state)=> state.auth.token)
    const dispatch = useDispatch();
    const [enrolledCourses ,setEnrolledCourses] = useState(null)
    const navigate = useNavigate();

    const getEnrolledCourses = async ()=>{
        try {
            const response = await getUserCourses(token,dispatch);
            setEnrolledCourses(response);
            console.log(response)
        } catch (error) {
            console.log("Unable to fetch courses",error)
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])


  return (
    <div className='text-white '>
        <div className='text-4xl'>
            Enrolled Courses
        </div>

        {
            !enrolledCourses ? (<div>
                Loading...
            </div>) : !enrolledCourses.length ? (<p>You have not enrolled in any course</p>) : (
                <div className='mt-10 flex flex-col justify-between'>
                    <div className='bg-[#2C333F]'>
                       <div className='w-11/12 flex justify-between gap-4  p-4 text-[#C5C7D4]'>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                      </div> 
                    </div>
                      
                        

                        {
                            enrolledCourses.map((course,index)=>{
                                return <div className='flex  justify-between border-[1px] p-3 border-[#2C333F]' onClick={()=>{
                                    navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                                }}>
                                    <div className='flex w-1/6 gap-3'>
                                        <div className='h-[60px] w-[90px] overflow-hidden'>
                                        <img src={course.thumbnail} alt='courseThumbnail'/>
                                    </div>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                    </div>
                                    
                                    

                                    <div>
                                        <p>{course.totalDuration}</p>
                                    </div>
                                    <div className='mr-24'>
                                       <div>
                                        <p>Progress{course.progressPercentage || 0}%</p>
                                    </div>
                                    <div>
                                        <ProgressBar
                                        completed={course.progressPercentage || 0}
                                         height='8px'
                                         isLabelVisible={false}
                                        />
                                    </div> 
                                    </div>
                                    
                                </div>
                            })
                        }
                    
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses