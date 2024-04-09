import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategory } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import Upload from './Upload';
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn'
import {setStep , setCourse, setEditCourse} from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast';

const CourseInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch()
    const {token} = useSelector((state)=>state.auth)
    const {course, editCourse} = useSelector((state)=> state.course);
    const [courseCategory, setCourseCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCourseCategory = async () => {
        setLoading(true);
        const categories = await fetchCourseCategory();
        

        if(categories.length > 0){
            setCourseCategory(categories); 
        }
        setLoading(false)
    }

useEffect(()=>{
    

    if(editCourse){
        setValue("courseTitle",course.courseName);
        setValue("courseDescription",course.courseDescription);
        setValue("coursePrice",course.price);
        setValue("courseTags",course.tag);
        setValue("courseBenefits",course.whatYouWillLearn);
        setValue("courseCategory",course.category);
        setValue("courseRequirements",course.instructions);
        setValue("courseImage",course.thumbnail);
    }

    getCourseCategory();
},[])

const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseDescription !== course.courseDescription || 
        currentValues.coursePrice !== course.price ||
        // currentValues.courseTags.toSring() !== course.tag.toSring() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory !== course.category ||
        currentValues.courseRequirements.toString !== course.instructions.toString() || 
        currentValues.courseImage !== course.thumbnail)
    return true
    else
    return false
}




const onSubmit = async (data) => {

    if(editCourse){
        if(isFormUpdated()){
            const currentValues = getValues();
        const formData = new FormData()

        formData.append("courseId", course._id)

        if(currentValues.courseTitle !== course.courseName){
            formData.append("courseName", data.courseTitle)
        }

        if(currentValues.courseDescription !== course.courseDescription){
            formData.append("courseDescription", data.courseDescription)
        }

        if(currentValues.coursePrice !== course.price){
            formData.append("price", data.coursePrice)
        }

        if(currentValues.courseBenefits !== course.whatYouWillLearn){
            formData.append("whatYouWillLearn", data.courseBenefits)
        }

        if(currentValues.courseCategory._id !== course.category._id){
            formData.append("category", data.courseCategory)
        }

        if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
            formData.append("instructions", JSON.stringify(data.courseRequirements ))
        }

        setLoading(true)
        const result = await editCourseDetails(formData,token)
        setLoading(false)

        if(result){
            dispatch(setEditCourse(false))
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        
        }

        else{
            toast.error("No changes made so far!!")
        }
        console.log("Printing Form Data", formData)
        console.log("Printing Result",result)
        return
    }

    //create new course

    const formData = new FormData()

    formData.append("courseName",data.courseTitle)
    formData.append("courseDescription",data.courseDescription)
    formData.append("price",data.coursePrice)
    
    formData.append("whatYouWillLearn",data.courseBenefits)
    formData.append("category",data.courseCategory)
    formData.append("instructions",JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage",data.courseImage)

    setLoading(true)

    console.log("Before hitting Add course API")
    console.log("Form data-->",formData)
    const result = await addCourseDetails(formData,token);
    

    if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }

    setLoading(false)

    console.log("Printing Form Data", formData)
    console.log("Printing Result", result)
    
}
    
return (
    <div className='mt-8'>
        <h1 className='text-3xl'>
            Course Information
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 border-2 p-5 rounded-lg bg-richblack-800 border-richblack-500 w-full'>
            <div className='flex flex-col gap-2'>
                <label>Course Title <sup className='text-pink-300'>*</sup></label>
                <input
                    id='courseTitle'
                    name='courseTitle'
                    type='text'
                    placeholder='Enter course title'
                    {...register("courseTitle",{required:true})}
                    className='w-full bg-richblack-300 p-1 rounded-md'
                />
                {
                    errors.courseTitle && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Title is required</span>
                    )
                }
            </div>

            <div className='flex flex-col gap-2 mt-3'>
                <label>Course Description <sup className='text-pink-300'>*</sup></label>
                    <textarea
                    id='courseDescription'
                    name='courseDescription'
                    placeholder='Enter course description'
                    {...register("courseDescription", { required: true })}
                    className='w-full bg-richblack-300 p-1 rounded-md'
                    rows={4} // You can adjust the number of rows as needed
                    ></textarea>
                {
                    errors.courseDescription && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Description is required</span>
                    )
                }
            </div>
            <div className='flex flex-col gap-2 mt-3 relative'>
                <label>Course Price <sup className='text-pink-300'>*</sup></label>
                <input
                    id='coursePrice'
                    name='coursePrice'
                    type='text'
                    placeholder='Enter Course Price'
                    {...register("coursePrice",{required:true , valueAsNumber:true})}
                    className='w-full bg-richblack-300 p-1 rounded-md !pl-12'
                />
                <HiOutlineCurrencyRupee  className='absolute bottom-1 text-xl text-richblack-900 font-bold'/>
                {
                    errors.coursePrice && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Price is required</span>
                    )
                }
            </div>

            <div className='flex flex-col gap-2 mt-3'>
                <label>Course Category <sup className='text-pink-300'>*</sup></label>
                <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory",{required:true})}
                className='w-full bg-richblack-300 p-1 rounded-md'
                >

                <option value="" disabled className='w-full bg-richblack-300 p-1 rounded-md'>Choose a category</option>
                    {
                        !loading && courseCategory.map((item,index)=>{
                            return <option key={index} value={item?._id} className='text-richblack-900'>{item?.name}</option>
                        })
                    }
                </select>
                
                {
                    errors.courseCategory && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Category is required</span>
                    )
                }
            </div>

            <div>
            <Upload
            name={"courseImage"}
            label={"CourseImage"}
            register={register}
            errors={errors}
            text="Course Thumbnail"
            setValue={setValue}
            />
            </div>

        <div className='flex flex-col space-y-2 mt-3'>
            <label className='text- text-richblack-5'>Benefits of the course<sup className='text-pink-200'>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='w-full bg-richblack-300 p-1 rounded-md '
            rows='4'
            />
            {errors.courseBenefits && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Benefits of the course are required**
                </span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label="Course Requirements"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div className='mt-5'>
            {
                editCourse && (
                    <button onClick={()=>dispatch(setStep(2))}>
                        Continue without saving
                    </button>
                )
            }

            <IconBtn 
                text={!editCourse ? "Next" : "Save Changes"}
            />
        </div>







        </form>
    </div>
  )
}

export default CourseInformation