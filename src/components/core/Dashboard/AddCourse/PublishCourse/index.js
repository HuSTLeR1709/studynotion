import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {COURSE_STATUS} from "../../../../../utils/constants"
import {
    resetCourseState,
    setCourse,
    setEditCourse,
    setStep,
  } from "../../../../../slices/courseSlice";
import IconBtn from '../../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';


const PublishCourse = () => {

    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state => state.auth);
    const {course} = useSelector(state => state.course);
    
    const goToCourses = ()=> {
        dispatch(resetCourseState())
        // navigate("/dashboard/my-courses")
    }

    useEffect(()=>{
           if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
           } 
    },[])
    const handleCoursePublish = async () => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goToCourses();
            return
        }

        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        if(result){
            goToCourses()
        }
        setLoading(false)
    }

    const onSubmit = ()=> {
        handleCoursePublish()
    }

    const goBack = ()=> {
        dispatch(setStep(2))
    }

  return (

    <div>
        <div className='rounded-md p-6 mt-9 border-richblack-700 bg-richblack-800 border-[1px]'>

        <h1 className='text-xl font-semibold'>Publish Course</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-3 mt-4 ml-6'>
                
                <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='h-6 w-6 rounded bg-transparent custom-checkbox'
                />
                <label htmlFor='public' className='text-md text-[#6E727F]'>
                    Make this course public
                </label>
            </div>
            <div className='mt-10 flex justify-between'>
            <button
            type='button'
            disabled={loading}
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <IconBtn disabled={loading} text={"Save and Publish"}/>
            </div>

        </form>

        </div>

    </div>
  )
}

export default PublishCourse