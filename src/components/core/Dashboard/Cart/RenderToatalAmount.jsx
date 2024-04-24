import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

const RenderToatalAmount = () => {
    const {total, cart} = useSelector((state)=> state.cart);
    const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const handlebuycourse = ()=> {
        const courses = cart.map((course)=> course._id)
        buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className='w-1/4 border-[1px] border-[#2C333F] p-4 h-1/5 flex bg-[#161D29]'>
        <div className='flex flex-col gap-1'>
            <p className='text-[#999DAA]'>Total:</p>
            <p className='text-[#FFD60A] text-3xl'>Rs. {total}</p>
            <div>
                <IconBtn
                text="Buy now"
                onclick={handlebuycourse}
                customClasses={'w-[120px]'}
            />
            </div>
            
        </div>
    </div>
  )
}

export default RenderToatalAmount