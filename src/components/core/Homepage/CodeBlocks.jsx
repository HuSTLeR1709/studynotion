import React from 'react'
import CTAbutton from './CTAbutton'
import HighlightText from '../HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({position , heading , subheading , ctabtn1, ctabtn2, codeblock, backgroundgradient, codecolor }) => {
  return (
    <div className={`flex ${position} justify-between gap-10 my-20 mx-20 `} >  

    <div className='flex flex-col w-[40%] gap-8 text-4xl'>
    {heading}
    <div className='text-richblack-300 font-bold text-xl'>
        {subheading}
    </div>

    <div className='flex gap-7 mt-7 text-xl'>
        <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center '>
                 {ctabtn1.text}
                 <FaArrowRight/>
            </div>
        </CTAbutton>

         <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                 {ctabtn2.text}
        </CTAbutton>
    </div>

    </div>

    <div className='flex w-[40%] h-fit  bg-richblack-700 p-4'>

    <div className='w-[10%] flex flex-col text-center text-richblack-400 font-inter font-bold'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
    </div>

    <div className={`w-[90%] flex flex-col font-bold gap-4 ${codecolor} pr-2 font-mono `}>
    <TypeAnimation 
    sequence={[codeblock,2000,""]}
    repeat={Infinity}
    cursor={true}
    omitDeletionAnimation={true}
    style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    overflowX:"hidden",
                    fontSize:"16px",
                }
            }
    />

    </div>

    </div>





    </div>
  )
}

export default CodeBlocks