import axios from 'axios'; // For making HTTP requests
import React, { useState, useEffect } from 'react'; // React library and hooks
import { useNavigate } from 'react-router-dom'; // For navigation

const DeleteDepartment = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const [departments, setDepartments] = useState([]); // State to store department list
    const [loading, setLoading] = useState(false); // State to manage loading state

    // Function to fetch departments
    const fetchDepartments = async () => {
        e.preventDefault(); // Prevent default form behavior

        setLoading(true); // Set loading to true while fetching data
        try {
            // Make GET request to retrieve department list
            const response = await axios.get(`http://localhost:5000/api/department`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`, // Attach auth token
                },
            });
            if (response.data.success) {
                setDepartments(response.data.departments); // Update state with fetched data
            }
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    // Function to handle delete
    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this department?`)) {
            try {
                // Make DELETE request to delete department
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`, // Attach auth token
                    },
                });
                if (response.data.success) {
                    // Fetch updated department list
                    alert('Department deleted successfully.');
                    fetchDepartments(); // Re-fetch departments after deletion
                }
            } catch (error) {
                console.error("Failed to delete department:", error);
                alert('Failed to delete department. Please try again.');
            }
        }
    };

    // Fetch departments on component mount
    useEffect(() => {
        fetchDepartments(); // Fetch departments when the component loads
    }, []);

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Manage Departments</h2>
            {loading ? (
                <div>Loading...</div> // Show loading message while fetching data
            ) : (
                <div>
                    {departments.length > 0 ? (
                        <ul>
                            {departments.map((department) => (
                                <li
                                    key={department.id}
                                    className='flex justify-between items-center p-4 border-b'
                                >
                                    <div>
                                        <h3 className='text-lg font-semibold'>{department.dep_name}</h3>
                                        <p className='text-gray-600'>{department.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(department.id)}
                                        className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No departments available.</p> // Show message if no departments exist
                    )}
                </div>
            )}
            <button
                onClick={() => navigate('/admin-dashboard/add-department')}
                className='mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
            >
                Add New Department
            </button>
        </div>
    );
};

export default DeleteDepartment;
