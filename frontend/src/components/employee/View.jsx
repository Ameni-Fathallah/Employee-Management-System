import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
    const {id}=useParams();
    const [employee,setEmployee]=useState(null);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}` // Attach auth token
                    }
                });
                console.log(response.data);
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployee(); 
    }, [id]); 

    return (
        <>
          {employee ? (
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Employee Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Image */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={`http://localhost:5000/${employee.userId.profileImage}`}
                    alt="Profile"
                    className="rounded-full border-4 border-gray-200 w-70 h-70 object-cover shadow-sm"
                  />
                </div>
    
                {/* Employee Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Name:</p>
                    <p className="text-lg text-gray-900">{employee.userId.name}</p>
                  </div>
    
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Employee ID:</p>
                    <p className="text-lg text-gray-900">{employee.employeeId}</p>
                  </div>
    
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Date of Birth:</p>
                    <p className="text-lg text-gray-900">
                      {new Date(employee.dob).toLocaleDateString()}
                    </p>
                  </div>
    
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Gender:</p>
                    <p className="text-lg text-gray-900">{employee.gender}</p>
                  </div>
    
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Department:</p>
                    <p className="text-lg text-gray-900">{employee.department.dep_name}</p>
                  </div>
    
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">Marital Status:</p>
                    <p className="text-lg text-gray-900">{employee.maritalStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 mt-10">Loading...</div>
          )}
        </>
      );
}

export default View