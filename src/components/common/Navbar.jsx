import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import {  FaChevronDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/api'

// const subLinks = [
//     {
//         title: "Pyhton",
//         link : "/catalog/python"
//     },
//     {
//         title: "Devops",
//         link: "/catalog/devops"
//     }
// ]

const Navbar = () => {
    const {token} = useSelector((state)=> state.auth)
    const {user} = useSelector((state)=> state.profile)
    const {cart} = useSelector((state)=> state.cart)

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            if (result?.data?.data?.length > 0) {
                setSubLinks(result?.data?.data);
            }
            localStorage.setItem("sublinks", JSON.stringify(result.data.data));
            console.log("Sublinks",result.data.data)

        } catch (error) {
            // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
            // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchSublinks();

    },[])
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
  return (
    <div className='flex items-center justify-center h-14 border-[1px] border-b-richblack-50 bg-richblack-700'>
    <div className='w-11/12 max-w-maxContent flex items-center justify-between text-white'>
    <Link to="/">
    <img src={logo} alt='logo' width={160} height={42} loading='lazy'/>

    </Link>
    <nav>
        <ul className='flex gap-x-4 text-richblack-25'>
           {
            NavbarLinks.map((link,index)=>{
                return <li key={index}>
                
                {link.title === "Catalog" ? <div className='flex'>
                    <div className='relative flex items-center gap-2 group'>
                        {link.title} 
                        <FaChevronDown className='mt-1' />

                        <div className='invisible flex flex-col left-[-100%] top-[140%] absolute rounded-md bg-richblack-5 text-richblack-900 opacity-0 p-4 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[250px] z-10'>
                                <div className='absolute left-[55%] rotate-45 rounded bg-richblack-5 top-[-35%] h-6 w-6 translate-y-5'>

                                 </div>
                                 {
                                    subLinks.length > 0  ? (
                                        subLinks.map((subLink, index)=>{
                                            return <Link to={`catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index} className=' font-semibold hover:text-richblue-400 hover:scale-105 transition-all duration-200'>
                                            <p>{subLink.name}</p>
                                            <div className='w-3/4 border-brown-100 border-b-2 mb-1'>

                                            </div>

                                            </Link>

                                        })
                                    ) : <div></div>
                                 }

                        </div>
                        
                    </div>
                </div> :(
                    <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                       {link.title} 
                    </p>
                        
                    </Link>
                )}
                
                </li>
            })
           } 
        </ul>
    </nav>

    <div className='flex gap-4 items-center'>
    {
        user && user?.accountType !== "Instructor" && (
            <Link to='/dashboard/cart'>
            <AiOutlineShoppingCart />
            {
                cart.totalItems !== 0 && (
                    <span>
                        {cart.totalItems}
                    </span>
                )
            }
            </Link>
        )
    }

    {
        token === null && (
            <Link to='/login'>
                <button className=' text-richblack-25 rounded-md border-[2px] px-3 py-1 text-center border-richblack-800'>Login</button>
            </Link>
        )
    }

    {
        token === null && (
            <Link to='/signup'>
            <button className='text-richblack-25 rounded-md border-[2px] px-3 py-1 text-center border-richblack-800'>SignUp</button>
            </Link>
        )
    }
    {
        token !== null && <ProfileDropDown/>
    }

    </div>


    </div>




    </div>
  )
}

export default Navbar