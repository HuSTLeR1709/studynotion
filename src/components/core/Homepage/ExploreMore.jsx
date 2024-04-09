import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import CourseCard from './CourseCard';
import HighlightText from '../HighlightText';

const ExploreMore = () => {
    
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
    ];

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }

  return (
    <div>
    <div className='flex flex-col m-8'>
                <div className='text-5xl text-center'>
                    Unlock the 
                    <HighlightText text={"Power of Code"}/>
                </div>
                <div className='text-center m-3 '>
                Learn to Build Anything You Can Imagine
                </div>

                <div className='flex gap-2'>
                    {
                        tabsName.map((element,index)=>{
                            return (
                                <div className={` flex text-[16px] items-center justify-center ${currentTab === element ? "bg-richblack-700 text-richblack-5 font-medium" : " text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-700 hover:text-richblack-5 px-5 py-2`}
                                key={index}
                                onClick={()=> setMyCards(element)}>

                                {element}


                            </div>
                            )
                        })
                    }
                </div>
                <div>
                <div className='flex gap-5'>
                    {courses.map((element,index)=>{
                        return (
                            <CourseCard
                            key={index}
                            carddata={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                             />
                        )

                    })}
                </div>

                </div>
            </div>

    </div>

  )
}

export default ExploreMore