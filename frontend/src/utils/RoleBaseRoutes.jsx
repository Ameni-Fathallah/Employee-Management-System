import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'
const RoleBaseRoutes = ({children,requiredRole}) => {
    const {user,loading}=useAuth();
 
    if(loading){
     return <div>Loading.....</div>
    }

    //requiredRole is an array of admin in employee as example a route is accessible par admin so the requiredrole is passed as admin 
    if(!requiredRole.includes(user.role)){//accesss to the role of the user that log in the system
        <Navigate to="/unauthorized"/>//because the employee is accessed but the route is accessible only for the admin
    }

    return user? children:<Navigate to="/login"/>
}

export default RoleBaseRoutes