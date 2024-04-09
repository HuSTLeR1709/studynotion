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
                return <div>
                <div>
                    <img src={course.thumbnail} alt='courseThumbnail'/>
                    <div>
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

                <div>
                    <button onClick={()=> dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p>{course?.price}</p>
                </div>
                <div>

                </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses