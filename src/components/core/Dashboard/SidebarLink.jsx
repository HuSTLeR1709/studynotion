import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-3 text-sm ${matchRoute(link.path) ? "bg-yellow-100" : "bg-opacity-0 text-richblack-25"}`}
    >
        <span className={`absolute left-0 top-0 w-[0.2rem] h-full bg-yellow-50 ${matchRoute(link.path)? "opacity-100" : "opacity-0"}`}></span>

        <div className='flex gap-x-2 items-center'>
            <Icon className='text-lg'/>
            <span>{link.name}</span>

        </div>
    </NavLink>
  )
}

export default SidebarLink