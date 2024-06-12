import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {

    const {token} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        const fetchCourses = async ()=> {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result)
            }
        }
        
        fetchCourses()
    },[])
  return (
    <div>
        <div className='flex justify-between px-3'>
            <h1 className='text-richblack-5 text-4xl font-semibold'>My Courses</h1>
            <IconBtn text="Add Course"
                onclick={()=>navigate("/dashboard/add-course")}
            />
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses