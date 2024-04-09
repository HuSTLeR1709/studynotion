import React from 'react'
import HighlightText from '../HighlightText'

const Quote = () => {
  return (
    <div className='text-3xl w-8/12 text-center '>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={'combines technology'}/>
        ,
        <span className='text-brown-200'>
         
            expertise
        </span>
        , and community to create an
        <span className='text-yellow-100'>
        {' '}
        unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote