import { useState } from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderToatalAmount from "./RenderToatalAmount";


export default function Cart() {
    const {total, totalItems} = useSelector((state)=> state.cart)

    return <div className="text-white">
        <h1 className="text-4xl">Your Cart</h1>
        <p className="mt-10 text-sm text-[#6E727F]">{totalItems} items in your cart</p>

        {total > 0 ? 
        (<div className="flex justify-between">
           <RenderCartCourses/>
        <RenderToatalAmount/> 
        </div>)
         : (<div>
            <p>Your Cart is Empty</p>
         </div>)
        
        }
    </div>
}