import React, {useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { BigPlayButton, Player } from 'video-react';
import "video-react/dist/video-react.css";
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';
const VideoDetails = () => {

  const { courseId, sectionId, subSectionId} = useParams()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation()
  const {token} = useSelector((state)=>state.auth)
  const {courseSectionData,courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);
  const [videoData, setVideoData]= useState([])
  const [videoEnded, setVideoEnded]= useState(false)
  const [loading, setLoading] = useState(false)
  const [previewSource, setPreviewSource] = useState("");

  useEffect(()=>{

    const setVideoSpecificDetails = async ()=>{
        if(!courseSectionData.length)
        return;
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }
      else{
        const filteredData = courseSectionData.filter(
          (course)=> course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data)=> data._id === subSectionId
        )
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=> data._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
     

  }
  const isLastVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=> data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
      return true;
    }
    else{
      return false;
    }

  }
  const goToNextVideo = ()=>{

    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=> data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      const nextSectionId = courseSectionData[currentSectionIndex+1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }

  }
  const goToPrevVideo =()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=> data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0){
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)

    }
    else{
      const prevSectionId = courseSectionData[currentSectionIndex-1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndex-1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }
  const handelLectureCompletion = async()=>{
      setLoading(true)

      const res = await markLectureAsComplete({sectionId: sectionId, subSectionId:subSectionId}, token)
      //
      if(res){
        dispatch(updateCompletedLectures(subSectionId))
      }
      setLoading(false)

      console.log(res)


  }
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {/* {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )} */}

              {!completedLectures.includes(subSectionId) && (
                <button
                  className="mx-auto bg-yellow-100 text-richblack-900 px-3 py-2 rounded-md text-xl mb-6"
                  onClick={() => handelLectureCompletion()}
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </button>
              )}

              {/* <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              /> */}
              <button
                onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                className="text-xl rounded-md text-richblack-900 mx-auto w-fit px-3 py-2 bg-yellow-100"
              >
                Rewatch
              </button>
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton bg-yellow-100 px-2 py-0 rounded-md text-richblack-900"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton bg-yellow-100 px-3 py-2 rounded-md text-richblack-900"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      {/* <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p> */}
    </div>
  )
}

export default VideoDetails