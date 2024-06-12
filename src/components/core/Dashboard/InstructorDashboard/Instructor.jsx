import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([])
    const {token} = useSelector((state)=> state.auth)
    const {user} = useSelector((state)=> state.profile)
    useEffect(()=>{
        const getCourseDatawithStats = async() => {
            setLoading(true)

            const instructorAPIData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorAPIData);

            if(instructorAPIData.length){
                setInstructorData(instructorAPIData)
            }
            if(result){
                setCourses(result)
            }

            setLoading(false)


        }

        getCourseDatawithStats()

    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc,curr)=> acc + curr.totalStudentEnrolled, 0)
  return (
    <div className='text-white'>
        <div>
            <h1 className='text-white'>Hi {user?.firstName}</h1>
            <p>Let's start something New...</p>
        </div>
        {
            loading? (<div className='spinner'></div>) :
            courses.length > 0 
            ? (<div>
                <div>
                
                <div>
                    <InstructorChart courses={instructorData}/>
                </div>
                    <p>Statistics</p>
                    <div>
                        <p>Total Courses</p>
                        <p>{courses.length}</p>
                    </div>
                    <div>
                        <p>Total Students</p>
                        <p>{totalStudents}</p>
                    </div>
                    <div>
                        <p>Total Income</p>
                        <p>{totalAmount}</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p>View All</p>
                        </Link>
                    </div>
                    <div>
                        {
                            courses.slice(0,3).map((course)=>(
                                <div>
                                    <img src={course.thumbnail} alt="courseThumbnail"/>
                                    <p>{course.courseName}</p>
                                    <div>
                                        <p>{course.studentEnrolled.length} students</p>
                                        <p>|</p>
                                        <p>Rs. {course.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>) :(<div>
                    <p>You have not created any course yet</p>
                    <Link to="/dashboard/add-course">
                        Create a Course
                    </Link>
            </div>)
        }
    </div>
  )
}

export default Instructor