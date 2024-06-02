import React from 'react'
import HighlightText from '../components/core/HighlightText'
import bannerimg1 from '../assets/Images/aboutus1.webp'
import bannerimg2 from '../assets/Images/aboutus2.webp'
import bannerimg3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className=' mt-12 text-richblack-25 w-11/12 mx-auto'>
        {/* Section1 */}
        <section>
            <div>
                <header className='text-3xl flex flex-col items-center justify-center'>
                    Driving Innovation in Online Education for a
                    <br/>
                    <HighlightText text={"Brighter Future"} />
                    <p className='text-xl w-3/4 text-center text-richblack-300'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className='flex gap-4 mx-auto items-center justify-center mt-12'>
                    <img src={bannerimg1} alt='banner1'/>
                    <img src={bannerimg2} alt='banner2'/>
                    <img src={bannerimg3} alt='banner3'/>
                </div>
            </div>
        </section>

        {/* Section2 */}
        <section>
            <div className='flex items-center justify-center'>
                <Quote/>
            </div>
        </section>

        {/* Section3 */}
        <section >
            <div className='flex items-center justify-center mt-12 flex-col gap-9'>
            {/* Founding Story */}
            <div className='flex justify-evenly'>
                <div className='w-2/5 flex flex-col gap-3 text-richblack-300'>
                <span className='text-3xl'>
                    <HighlightText text={'Our Founding Story'}/>
                </span>
                    
                    <p>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div className='w-2/5'>
                    <img src={FoundingStory} alt='FoundingStory'/>
                </div>
            </div>

            <div className='flex justify-evenly'>
                {/* Left Div */}
                <div className='w-2/5 flex flex-col gap-3'>

                <h1 className='text-3xl text-brown-100 '>
                    Our Vision
                </h1>
                <p className='text-richblack-300'>
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>

                </div>

                {/* Right Div */}

                <div className='w-2/5 flex flex-col gap-3'>

                <h1 className='text-3xl'>
                    <HighlightText text={'Our Mission'}/>
                </h1>

                <p className='text-richblack-300'>
                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>

                </div>
            </div>

            </div>
        </section>
        {/* Section 4 */}
        <section>
            <StatsComponent/>
        </section>

        {/* Section5 */}

        <section>
            <LearningGrid/>
            <ContactFormSection/>
        </section>

        <Footer/>
    </div>
  )
}

export default About