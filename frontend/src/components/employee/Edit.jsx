import React, { useState, useEffect } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        gender: '',
        dob: '',
        role: '',
        department: '',
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams(); // Get id from URL

    // Fetch departments on component mount
    useEffect(() => {
        const getDepartments = async () => {
            const departmentsData = await fetchDepartments(); // Fetch departments
            setDepartments(departmentsData);
        };
        getDepartments();
    }, []);

    // Fetch employee data on component mount
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                if (response.data.success) {
                    const { userId, maritalStatus, designation, salary, department, gender, dob, role } = response.data.employee;
                    setEmployee({
                        name: userId ? userId.name : '', // Check if userId exists
                        maritalStatus,
                        designation,
                        salary,
                        gender,
                        dob: dob ? new Date(dob).toISOString().split('T')[0] : '', // Format date for input field
                        role,
                        department: department ? department._id : '' // Ensure department is set correctly
                    });
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    alert("An error occurred while fetching employee data.");
                }
            }
        };
        fetchEmployee();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee, // Send the updated employee data
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while updating the employee.");
            }
        }
    };

    return (
        <>
            {departments && employee ? (
                <div className='max-w-4xl mx-auto mt-10 bg-teal-50 p-10 rounded-lg shadow-2xl'>
                    <h2 className='text-4xl font-bold text-teal-700 mb-10 text-center'>Edit Employee</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Name */}
                            <div>
                                <label htmlFor='name' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    value={employee.name}
                                    onChange={handleChange}
                                    placeholder='Insert Name'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Marital Status */}
                            <div>
                                <label htmlFor='maritalStatus' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Marital Status
                                </label>
                                <select
                                    id='maritalStatus'
                                    name='maritalStatus'
                                    onChange={handleChange}
                                    value={employee.maritalStatus}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>

                            {/* Designation */}
                            <div>
                                <label htmlFor='designation' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Designation
                                </label>
                                <input
                                    type='text'
                                    id='designation'
                                    name='designation'
                                    onChange={handleChange}
                                    value={employee.designation}
                                    placeholder='Designation'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label htmlFor='salary' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Salary
                                </label>
                                <input
                                    type='number'
                                    name='salary'
                                    onChange={handleChange}
                                    value={employee.salary}
                                    placeholder='Salary'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label htmlFor='dob' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Date of Birth
                                </label>
                                <input
                                    type='date'
                                    value={employee.dob}
                                    name='dob'
                                    onChange={handleChange}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label htmlFor='gender' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Gender
                                </label>
                                <select
                                    name='gender'
                                    onChange={handleChange}
                                    value={employee.gender}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor='department' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Department
                                </label>
                                <select
                                    name='department'
                                    onChange={handleChange}
                                    value={employee.department}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-full">
                                <button
                                    type='submit'
                                    className='w-full mt-8 bg-teal-600 hover:bg-teal-700 font-bold py-3 px-4 rounded-lg text-white transition duration-300 shadow-lg hover:shadow-xl'
                                >
                                    Update Employee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : <div>Loading....</div>}
        </>
    );
};

export default Edit;