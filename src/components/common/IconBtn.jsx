import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    type,
    disabled,
    outline=false,

}) => {
  return (
  
        <button disabled={disabled} onClick={onclick} className=' flex items-center gap-2 bg-yellow-50 h-10 text-richblack-900 px-4 rounded-lg '>

    {
        children ? (
            <>
            <span>
                {text}
            </span>
            {children}
            </>
            
        ) : (text)
    }

    </button>

    
  )
}

export default IconBtn