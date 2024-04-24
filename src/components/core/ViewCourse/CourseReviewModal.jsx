import React, { useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    const {
        register,
        handleSubmit,
        setValue,
        formState : errors,
    } = useForm()

    useEffect(()=>{
        setValue("courseExperience", "")
        setValue("courseRating", 0)
    },[])

    const ratingChanged = (newRating)=> {
        setValue("courseRating", newRating)
    }

    const onSubmit = async(data)=> {
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        );
        setReviewModal(false)

    }
  return (
    <div>
        <div>
            <div>
                <p>Add Review</p>
                <button onClick={setReviewModal(false)}>Close</button>
            </div>
            <div>
                <div>
                    <img
                        src={user?.image}
                        alt='profilepic'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p>
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p>Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex-col items-center'>
                    <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor='#ffd700'
                     />
                     <div>
                        <label htmlFor='courseExperience'>Add your Experience</label>
                        <textarea
                        id='courseExperience'
                        placeholder='Add your Experience Here'
                        {...register("courseExperience", {required:true})}
                        className='form-style min-h-[130px] w-full'
                        >

                        </textarea>
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your Experience
                                </span>
                            )
                        }
                     </div>
                     <div>
                        <button onClick={()=> setReviewModal(false)}>Cancel</button>
                        <IconBtn text='Save'/>
                     </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal