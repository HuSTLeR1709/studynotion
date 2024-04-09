import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children , active, linkto}) => {
  return (
    <Link to={linkto}>
       <div className={`px-4 py-3 font-semibold rounded-lg shadow-md  ${active ? "bg-yellow-50 shadow-white text-black": "bg-richblack-800 shadow-richblack-700 text-white"} hover:scale-95 transition-all duration-200`}>{children} 
    </div> 
    </Link>
    
  )
}

export default CTAbutton