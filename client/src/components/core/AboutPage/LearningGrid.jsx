import React from 'react'
import HighlightText from '../HighlightText'
import CTAbutton from '../Homepage/CTAbutton'

const LearningGridArray = [ 
    {
        order:-1,
        heading:"World-Class Learning for ",
        highlightText: "Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText: "Learn More",
        btnLink:"/"
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
      
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order:2,
        heading:"Our Learning Methods",
      
        description:"The learning process uses the namely online and offline.",
    },
    {
        order:3,
        heading:"Certification",
      
        description:"You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order:4,
        heading:"Rating Auto-grading ",
      
        description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order:5,
        heading:"Ready to Work",
      
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
    
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10'>

    {
        LearningGridArray.map((card,index) => {
        return (
            <div key={index} className={`${index===0 && "lg:col-span-2 lg:h-[280px]"} ${card.order % 2 === 1 ? "bg-richblack-500 lg:h-[280px]" : "bg-richblack-800"} ${card.order===3 && "col-start-2"}`}>

            {
                card.order<0 ? 
                (
                    <div className='flex flex-col items-start p-10 gap-3 bg-richblack-900'>
                        <div className='text-3xl'>
                            {card.heading}
                            <br/>
                            <HighlightText text={card.highlightText}/>

                        </div>
                        <p className=' text-richblack-100'>
                            {card.description}
                        </p>
                        <CTAbutton active={true} linkto={card.btnLink}>{card.btnText}</CTAbutton>
                    </div>
                ) : (
                    <div className='flex flex-col gap-12 items-start p-10'>
                        <div className='text-white text-xl'>
                            {card.heading}
                        </div>
                        <p className='text-richblack-100'>
                            {card.description}
                        </p>
                    </div>
                )
            }





            </div>
        )
    })
    }



    </div>
  )
}

export default LearningGrid