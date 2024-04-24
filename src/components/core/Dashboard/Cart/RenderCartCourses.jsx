import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiBarbedStar } from "react-icons/gi";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart)
    const dispatch  = useDispatch()
  return (
    <div>
        {
            cart.map((course,index)=>{
                return <div className='flex justify-between mb-8 border-b-[1px] border-[#2C333F] p-4 w-[700px]'>
                <div className='flex gap-4 justify-between'>
                <div className='w-[200px]'>
                    <img src={course.thumbnail} alt='courseThumbnail '/>
                </div>
                    
                    <div className='flex flex-col'>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor='#ffd700'
                                emptyIcon={<GiBarbedStar />}
                                filledIcon={<GiBarbedStar />}
                            />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <button onClick={()=> dispatch(removeFromCart(course._id))} className='flex items-center gap-2 border-[1px] rounded-xl border-[#2C333F] p-2 bg-[#161D29] text-[#EF476F]'>
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p className='text-[#FFD60A] text-2xl'>Rs. {course?.price}</p>
                </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses