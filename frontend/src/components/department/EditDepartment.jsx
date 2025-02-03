// Importing necessary modules
import axios from 'axios'; // For making HTTP requests
import React, { useState, useEffect } from 'react'; // React library and hooks
import { useNavigate, useParams } from 'react-router-dom'; // For routing and navigation

// Component definition
const EditDepartment = () => {
    const navigate = useNavigate(); // Initialize navigation hook
    const { id } = useParams(); // Get department ID from URL parameters
    const [department, setDepartment] = useState({}); // State to store department details
    const [depLoading, setDepLoading] = useState(false); // State to manage loading state

    // Function to handle form input changes
    const handleChange = (e) => {
        //the name represents the name attribute of the input field and value is the cueent input value
        const { name, value } = e.target; // Get name and value from event
        setDepartment({ ...department, [name]: value }); // Update department state with new value
    };

    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        try {
            // Make PUT request to update department data
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Attach auth token
                }
            });

            // Navigate to departments page if update is successful
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            // Display error message if request fails
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    };




    // useEffect to fetch department data on component load
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true); // Set loading to true while fetching data
            try {
                // Make GET request to retrieve department details
                //api is for dataa access
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}` // Attach auth token
                    }
                });
                // Set department data if request is successful
                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                // Display error message if request fails
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchDepartments(); // Fetch department data
    }, [id]); // Dependency array includes `id`, so it runs when `id` changes

    return (
        <>
            {depLoading ? (
                // Display loading message if data is still loading
                <div>Loading....</div>
            ) : (
                // Display form once data is loaded
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                    <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Department Name Input */}
                        <div>
                            <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>
                                Department Name
                            </label>
                            <input
                                name="dep_name"
                                type='text' 
                                placeholder='Enter Dep Name'
                                className='mt-1 pl-2 w-full border border-gray-300 rounded-md'
                                required 
                                value={department.dep_name || ''} // Display current department name
                                onChange={handleChange} // Handle change in input
                            />
                        </div>
                        {/* Department Description Input */}
                        <div className='mt-3'>
                            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                                Description
                            </label>
                            <textarea 
                                name='description' 
                                placeholder='Description'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                rows="4"
                                value={department.description || ''} // Display current description
                                onChange={handleChange} // Handle change in textarea
                            ></textarea>
                        </div>
                        {/* Submit Button */}
                        <button 
                            type='submit'
                            className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Update Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;


/*
Types of APIs
Web APIs (RESTful APIs): These are the most common. They allow applications to communicate over the internet using HTTP requests. Examples include REST and SOAP APIs.

REST API for a department resource might include:

GET /api/departments to retrieve a list of all departments
GET /api/departments/5 to retrieve information about department with ID 5
POST /api/departments to create a new department
PUT /api/departments/5 to update the information for department ID 5
DELETE /api/departments/5 to delete department ID 5*/