import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const List = () => {
    let sno = 1;
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            //debugging 
            // console.log("Token:", localStorage.getItem("token"));
            // console.log("API Response:", response.data); // Debugging

            if (response.data.success) {
                setLeaves(response.data.leaves); // Corrected from response.data.salary to response.data.leaves
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while fetching data.");
            }
        }
    };

    console.log("User ID:", user?._id);

    useEffect(() => {
        if (user) {
            fetchLeaves();
        }
    }, [user]);

    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-3xl font-bold'>Manage Leaves</h3>
            </div>

            <div className='flex justify-between items-center'>
                <input
                    type='text'
                    placeholder='Search By Dep Name'
                    className='px-4 py-0.5 border'
                />

                <Link
                    to="/employee-dashboard/add-leave"
                    className='px-4 py-1 bg-teal-600 rounded text-white'
                >
                    Add New Leave
                </Link>
            </div>

            {leaves && leaves.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500 mt-6">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{leave.leaveType}</td>
                                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{leave.reason}</td>
                                <td className="px-6 py-3">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No leaves found.</p>
            )}
        </div>
    );
};

export default List;