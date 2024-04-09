import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderStpes from '../AddCourse/RenderStpes'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state)=>state.course)
    const [loading,setLoading] = useState(false)
    const {token} = useSelector((state)=>state.auth)

    useEffect(()=>{
        const populateCourseDetails = async()=>{
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId,token)
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))

            }
            setLoading(false)
        }
        populateCourseDetails();

    },[])
  return (
    <div className='text-richblack-5'>
    <h1 className="text-4xl">Edit Course</h1>
    <div>
        {
            course ? (<RenderStpes/>) : (<p>Course Not Found</p>)
        }
    </div>

    </div>
  )
}

export default EditCourse