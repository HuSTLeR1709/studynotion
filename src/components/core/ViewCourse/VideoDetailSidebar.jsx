import React, { useEffect, useState } from 'react'
import {useNavigate, useParams , useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import IconBtn from '../../common/IconBtn'
const VideoDetailSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const {sectionId, subSectionId} = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state)=> state.viewCourse)

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=> data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=> data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
        })()
    },[courseSectionData, courseEntireData, location.pathname])
    console.log("coursedta",courseEntireData)
  return (
    <>

        <div className='text-richblack-5 '>
            <div>
                <div>
                     <div
                     onClick={()=>{
                        navigate("/dashboard/enrolled-courses")
                     }}>
                        Back
                     </div>
                     <div>
                        <IconBtn
                            text="Add Review"
                            onclick={()=>{setReviewModal(true)}}
                        />
                     </div>
                </div>
                <div>
                    <p className='text-richblack-5'>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length}/ {totalNoOfLectures}</p>
                </div>
            </div>
            <div>
                {
                    courseSectionData.map((course,index)=>(
                        <div onClick={()=> setActiveStatus(course?._id)} key={index}>
                            <div>
                                <div>
                                    {course?.sectionName}
                                </div>
                            </div>
                            <div>
                                {
                                     activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic,index)=>(
                                                    <div className={`flex gap-4 p-3 ${ videoBarActive === topic._id ? "bg-yellow-50 text-richblack-900" : " bg-richblack-900 text-richblack-5"}`}
                                                    key={index}
                                                    onClick={()=>{
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic?._id}`)
                                                        setVideoBarActive(topic?._id)
                                                    }}

                                                    >
                                                        <input
                                                            type='checkbox'
                                                            // checked={completedLectures.includes(topic._id)}
                                                            onChange={()=>{}}
                                                        />
                                                        <span>{topic.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                     )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>


    </>
  )
}

export default VideoDetailSidebar