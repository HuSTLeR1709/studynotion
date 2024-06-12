import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HighlightText';
import CTAbutton from '../components/core/Homepage/CTAbutton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import CourseCard from '../components/core/Homepage/CourseCard';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
const Home = () => {
  return (
    <>
        {/* section1 */}
        <div className='relative flex flex-col mx-auto items-center text-white w-11/12 justify-between font-inter mt-5'>
            <Link to={'/signup'}>
            <div className='group mx-auto mt-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                <button className='flex gap-2 flex-row justify-between items-center px-8 py-[5px] rounded-full shadow-md shadow-richblack-700 group-hover:bg-richblack-900'>
                <p>Become a Instructor</p>
                <FaArrowRight />
                </button>
            </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='text-center text-richblack-200 font-medium w-[60%] mt-7'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row justify-between w-[20%] mt-7 '>
                <CTAbutton children={"Learn More"} active={true} linkto={"/signup"}/>
                <CTAbutton children={"Book a Demo"} linkto={"/login"}/>
            </div>

            <div className='shadow-blue-200 mx-3 my-12 flex items-center justify-center'>
                <video muted loop autoPlay className='shadow-xl shadow-white' >
                <source src={Banner} type='video/mp4'></source></video>
                
            </div>

            <div>
                <CodeBlocks position={"flex-row"} 
                heading={
                    <div> Unlock your 
                    <HighlightText text={"coding ptentials"}/>
                    with our online courses.
                    </div>
                } 
                    subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }

                    ctabtn1={
                        {text:"Try it yourself",
                         active:true,
                         linkto:"/signup"

                        }

                    } 

                    ctabtn2={
                        {text:"Learn More",
                         active:false,
                         linkto:"/login"

                        }

                    } 
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css"\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<a href="three/">Three</a>\n </nav>`}
                    codecolor={"text-yellow-50"}
                />  
            </div>
            <div>
                <CodeBlocks position={
                    "flex-row flex-row-reverse "
                }

                    heading={
                        <div>
                            Start
                            <HighlightText text={"coding in Seconds"}/>
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                    ctabtn1={{
                        active:true,
                        text:"Continue Learning",
                        linkto:"/login"
                    }}

                    ctabtn2={{
                        text:"Learn More",
                        active:false,
                        linkto:"/signup"
                    }}

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css"\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<a href="three/">Three</a>\n </nav>`}
                    codecolor={"text-yellow-50"}
                />
            </div>

            <ExploreMore/>

             
                
      

           

            


        </div>
         <div className='bg-pure-greys-5'>

            <div className='homepage_bg h-[300px]'>
            <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto flex-col  justify-center'>
            <div className='flex flex-row gap-7 mt-32 justify-evenly'>
                <CTAbutton active={true}><div className='flex items-center gap-3'>
                <p>Explore Full Catalog</p>
                <FaArrowRight/>
                </div> 
                </CTAbutton>
                <CTAbutton active={false} children={"Learn More"}/>
            </div>


            </div>


            </div>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center gap-7'>
            <div className='flex flex-row gap-24 mt-10 mx-5 items-center justify-between'>
            <div className='text-4xl font-semibold w-[62%]'>
            Get the skills you need for a <HighlightText text={"job that is in demand."}/>
            </div>
            <div className='flex flex-col gap-10 w-[70%] items-start'>
                <div className='text-md text-xl '>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <div className='max-w-fit'><CTAbutton active={true} children={"Learn More"} /> </div>
                           </div>

            </div>
               <TimelineSection/>
                    <LearningLanguageSection/>
              
                 
            </div>

             </div>
                <div className='w-11/12 bg-richblack-900 text-white flex flex-col gap-5  items-center justify-center'>

                         <InstructorSection/>

                         <h2 className='text-4xl text-center font-bold mt-10'>Review from other Learners</h2>
                         <ReviewSlider/>

                     </div>
             
          


    <Footer/>
           
    </>
  )
}

export default Home