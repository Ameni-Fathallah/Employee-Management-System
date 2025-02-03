import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    //store the value inside state variable 
    const {user}=useAuth();
    const [leave, setLeave] = useState({
        userId:user._id,
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState)=>
            ({
            ...prevState,
            [name]: value
        })) 
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/leave/add`,leave, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data);
            if (response.data.success) {
                navigate('/employee-dashboard/leaves')   
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
                
            }
        }
    };

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Request for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col space-y-6'>
                    {/* Leave Type */}
                    <div>
                        <label htmlFor="leaveType" className='block text-sm font-medium text-gray-700'>
                            Leave Type
                        </label>
                        <select
                            id="leaveType"
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* From Date */}
                        <div>
                            <label htmlFor="startDate" className='block text-sm font-medium text-gray-700'>
                                From Date
                            </label>
                            <input
                                id="startDate"
                                type='date'
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                                required
                            />
                        </div>

                        {/* To Date */}
                        <div>
                            <label htmlFor="endDate" className='block text-sm font-medium text-gray-700'>
                                To Date
                            </label>
                            <input
                                id="endDate"
                                type='date'
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="reason" className='block text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={leave.reason}
                            onChange={handleChange}
                            placeholder='Reason for leave'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-300'
                    >
                        Submit Leave Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;