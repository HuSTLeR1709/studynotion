import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross1 } from 'react-icons/rx'
import Upload from '../CourseInformation/Upload'

const SubSectionModal = ({modalData, setModalData, add= false, view= false, edit= false}) => {
    
    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm()

    const dispatch =useDispatch()
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state => state.auth);
    const {course} = useSelector(state => state.course);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl ){
                return true;
            }
        else{
            return false;
        }
    }

    const handleEditSubsection = async () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
          formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
          formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
          // console.log("result", result)
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
      }
    

    const onSubmit = async (data) => {
        if(view){
            return
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No updates in form")
            }
            else{
                handleEditSubsection()
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId",modalData)
        formData.append("title",data.lectureTitle)
        formData.append("description",data.lectureDesc)
        formData.append("videoFile",data.lectureVideo)
        formData.append("courseId",course._id)
        setLoading(true);
        const result = await createSubSection(formData,token)

        if(result){
            const updatedCourseContent = course.courseContent.map((section)=> (section._id === modalData ? result : section));
            const updatedCourse = {...course, courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 w-9/12 max-w-[500px] rounded-xl border border-richblack-400 bg-richblack-800 p-7">
            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={()=>(!loading ? setModalData(null) : {})}>
                    <RxCross1/>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    text="Lecture Video"
                    video={true}
                    viewData = {view ? modalData.videoUrl : null }
                    editData = {edit ? modalData.videoUrl: null}
                />

                <div>
                    <label>Lecture Title</label>
                    <input
                        disabled={view || loading}
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required:true})}
                        className='w-full bg-richblack-300 p-1 rounded-md '
                    />
                    {errors.lectureTitle && (
                        <span>Lecture Title is Required</span>
                    )}
                </div>
                <div>
                    <label>Lecture Description</label>
                    <textarea
                        disabled={view || loading}
                        id='lectureDesc'
                        placeholder='Enter lecture Description'
                        {...register("lectureDesc", {required: true})}
                        className='w-full bg-richblack-300 p-1 rounded-md '
                        rows={4}
                    />
                    {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
                </div>
                {!view && (
                    <div>
                        <button className=' flex items-center gap-2 bg-yellow-50 h-10 text-richblack-900 px-4 rounded-lg left-0 mt-5 '>
                            {loading ? "Loading" : edit ? "Save Changes" : "Save"}
                        </button>
                    </div>
                )}
            </form>
        </div>

    </div>
  )
}

export default SubSectionModal