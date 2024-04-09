import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'

const Course_Card = ({course,Height}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
          <div>
              <div>
                <img src={course?.thumbnail} alt='CourseThumbnail'
                  className={`${Height} w-11/12 rounded-xl object-cover` }
                />
              </div>
              <div>
                <p>{course?.courseName}</p>
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div>
                    <span>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount}/>
                    <span>{course?.ratingAndReviews?.length} Ratings</span>

                </div>
                <p>{course?.price}</p>
              </div>
          </div>

        </Link>
    </div>
  )
}

export default Course_Card