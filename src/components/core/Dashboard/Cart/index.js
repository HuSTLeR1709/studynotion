import { useState } from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderToatalAmount from "./RenderToatalAmount";


export default function Cart() {
    const {total, totalItems} = useSelector((state)=> state.auth)

    return <div className="text-white">
        <h1>Your Cart</h1>
        <p>{totalItems} items in your cart</p>

        {total > 0 ? 
        (<div>
           <RenderCartCourses/>
        <RenderToatalAmount/> 
        </div>)
         : (<div>
            <p>Your Cart is Empty</p>
         </div>)
        
        }
    </div>
}