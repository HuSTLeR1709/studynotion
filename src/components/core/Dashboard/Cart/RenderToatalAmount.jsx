import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderToatalAmount = () => {
    const {total, cart} = useSelector((state)=> state.cart);
    const handlebuycourse = ()=> {
        const courses = cart.map((course)=> course._id)
        console.log("Bought these courses", courses)
    }
  return (
    <div>
        <div>
            <p>Total:</p>
            <p>Rs {total}</p>

            <IconBtn
                text="Buy now"
                onclick={handlebuycourse}
                customClasses={'w-full justify-center'}
            />
        </div>
    </div>
  )
}

export default RenderToatalAmount