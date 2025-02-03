import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt,FaUsers ,FaBuilding, FaCalendarAlt, FaCogs} from "react-icons/fa";
import { useAuth } from '../../context/authContext';


const Sidebar = () => {
    const {user} =useAuth(); 

  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12  flex items-center justify-center'>
            <h3 className='text-2xl text-center font-pacific '>Employee MS</h3>
        </div>
        <div className='p-2'>
            <NavLink to="/employee-dashboard" className={({isActive})=>`${isActive? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded `} end>
                <FaTachometerAlt/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive})=>`${isActive? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded `}>
                <FaUsers/>
                <span>My Profile</span>
            </NavLink>
            <NavLink to="/employee-dashboard/leaves" className={({isActive})=>`${isActive? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded `}>
                <FaBuilding/>
                <span>Leaves</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive})=>`${isActive? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded `}>
                <FaCalendarAlt/>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/employee-dashboard/setting" className={({isActive})=>`${isActive? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded `}>
                <FaCogs/>
                <span>Settings</span>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar