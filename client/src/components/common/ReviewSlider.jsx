import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Pagination, Autoplay, FreeMode} from 'swiper/modules'
import ReactStars from 'react-rating-stars-component'
import { ratingEndpoint } from '../../services/api'
import { apiConnector } from '../../services/apiConnector'
import { FaStar } from 'react-icons/fa'

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([])
    const truncateWords = 15;

    useEffect(()=>{
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingEndpoint.REVIEW_DETAILS_API)
            

            if(data?.success){
                setReviews(data?.data)
            }
            console.log("Reviews",reviews)
        }
        fetchAllReviews();
    },[])
  return (
    <div className='text-white w-full'>
        <div className='h-[190px] w-11/12 px-32'>
            <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay:2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'>
            {
                reviews.map((review,index)=>{
                     return <SwiperSlide key={index}>
                     <div className='border-[1px] rounded-lg border-richblack-500 p-2 w-[300px] bg-richblack-800'>
                     <div className='flex gap-2 mb-3 items-center'>
                        <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} alt='userImage'
                        className='h-9 w-9 rounded-full object-cover'
                    />
                    <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                     </div>
                        
                    <p className='text-richblack-200'>{review?.course?.courseName}</p>
                    <p>{review?.reviews}</p>
                    <p>{review?.rating.toFixed(1)}</p>
                    <ReactStars
                        edit={false}
                        count={5}
                        value={review.rating}
                        size={20}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar/>}
                        fullIcon={<FaStar/>}
                    />

                     </div>
                    

                    </SwiperSlide>
                })
            }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider