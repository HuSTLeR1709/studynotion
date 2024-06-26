import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Pagination, Autoplay} from 'swiper/modules'
import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
        navigation={true} 
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay:2500,
            disableOnInteraction: false
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="myswiper max-h-[30rem] mx-auto"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[230px]  md:h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider