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
            <h1 className='text-white text-4xl mb-3 font-semibold'>Hello, {user?.firstName} 👋</h1>
            <p>Let's start something New...</p>
        </div>
        {
            loading? (<div className='spinner'></div>) :
            courses.length > 0 
            ? (<div>
                <div className="my-4 flex md:flex-row flex-col h-[600px] md:h-[450px] md:space-x-4 ">
                
                <div>
                    <InstructorChart courses={instructorData}/>
                </div>
                <div className="flex md:mt-0 mx-auto mt-6 min-w-[300px] flex-col rounded-md bg-richblack-800 p-6">
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
                    
                </div>

                <div>
                    <div>
                        <p>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p>View All</p>
                        </Link>
                    </div>
                    <div className="my-4 flex md:flex-row flex-col w-full items-start md:space-x-6 space-y-5 md:space-y-0">
                        {
                            courses.slice(0,3).map((course)=>(
                                <div>
                                    <img src={course.thumbnail} alt="courseThumbnail" className="h-[201px] w-[100%] md:w-full rounded-md object-cover"/>
                                    <p>{course.courseName}</p>
                                    <div className='flex gap-2'>
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