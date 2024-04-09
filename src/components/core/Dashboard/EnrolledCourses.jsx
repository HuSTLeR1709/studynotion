import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {
    const token = useSelector((state)=> state.auth.token)
    const dispatch = useDispatch();
    const [enrolledCourses ,setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async ()=>{
        try {
            const response = await getUserCourses(token,dispatch);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch courses",error)
        }
    }

    useEffect(()=>{
        getEnrolledCourses()
    },[])


  return (
    <div className='text-white'>
        <div className='text-4xl'>
            Enrolled Courses
        </div>

        {
            !enrolledCourses ? (<div>
                Loading...
            </div>) : !enrolledCourses.length ? (<p>You have not enrolled in any course</p>) : (
                <div>
                      <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>

                        {
                            enrolledCourses.map((course,index)=>{
                                return <div>
                                    <div>
                                        <img src={course.thumbnail} alt='courseThumbnail'/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                    </div>

                                    <div>
                                        <p>{course.totalDuration}</p>
                                    </div>

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
                            })
                        }
                      </div>
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses