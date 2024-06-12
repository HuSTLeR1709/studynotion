import { useState } from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderToatalAmount from "./RenderToatalAmount";


export default function Cart() {
    const {total, totalItems} = useSelector((state)=> state.cart)

    return <div className="text-white">
        <h1 className="text-4xl">Your Cart</h1>
        <p className="mt-8 text-[#6E727F]">{totalItems} courses in your cart</p>
        <div className="h-[2px] rounded-xl mb-3 mt-3 bg-richblack-200"></div>

        {total > 0 ? 
        (<div className="flex justify-between">
           <RenderCartCourses/>
        <RenderToatalAmount/> 
        </div>)
         : (<div>
            <p className="text-xl text-center">Your cart is empty</p>
         </div>)
        
        }
    </div>
}