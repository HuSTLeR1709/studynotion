import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../../common/ConfirmationModal'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'

const CoursesTable = ({courses, setCourses}) => {
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    const handleDeleteCourse = async (courseId)=> {
        setLoading(true)
        const result = await deleteCourse({courseId:courseId},token)
        if(result){
            setCourse(result)
        }
        setLoading(false)
        setConfirmationModal(null)

    }
  return (
    <div className='text-richblack-5'>
    <Table>
        <Thead>
            <Tr className=" flex gap-x-24 border-richblack-800 p-8">
                <Th>
                    Course
                </Th>
                <Th>
                    Duration
                </Th>
                <Th>
                    Price
                </Th>
                <Th>
                    Actions
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {courses.length === 0 ? (
                <Tr>
                    <Td>
                        No Courses Found
                    </Td>
                </Tr>
            ) : (
                courses?.map((course)=>(
                    <Tr key={course._id} className=" flex gap-x-10 border-richblack-800 p-8">
                        <Td className="flex gap-x-4">
                            <img
                                src={course?.thumbnail}
                                alt='CourseThumbnail'
                                className='h-[150px] w-[220px] object-cover rounded-lg'
                            />
                            <div className='flex flex-col'>

                            <p>{course.courseName}</p>
                            <p>{course.courseDescription}</p>
                            <p>Created:</p>
                            {
                                course.status === COURSE_STATUS.DRAFT ? (
                                    <p className='text-pink-200'>Draft</p>
                                ) : (
                                    <p className='text-yellow-25'>Published</p>
                                )
                            }

                            </div>
                        </Td>
                        <Td>
                            2Hr 30min
                        </Td>
                        <Td>
                            Rs.{course.price}
                        </Td>
                        <Td>
                            <button
                            disabled={loading}
                            onClick={()=>{
                                navigate(`/dashboard/edit-course/${course._id}`)
                            }}
                            >
                                <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button 
                            disabled={loading}
                            onClick={()=>{
                                setConfirmationModal({
                                    text1:"Do you want to delete this Course?",
                                    text2:"All data related to this course will be deleted.",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handeler: !loading ? ()=>handleDeleteCourse(course._id):()=>{},
                                    btn2Handeler: !loading ? ()=>setConfirmationModal(null):()=>{},
                                })
                            }}
                            >
                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                        </Td>
                    </Tr>
                ))
            )}
        </Tbody>
    </Table>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CoursesTable