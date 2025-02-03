import React, { useState, useEffect } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Fetch departments on component mount
    useEffect(() => {
        const getDepartments = async () => {
            const departmentsData = await fetchDepartments(); // Fetch departments
            setDepartments(departmentsData);
        };
        getDepartments();
    }, []);

    // Fetch employees when a department is selected
    const handleDepartmentChange = async (e) => {
        const emps = await getEmployees(e.target.value); // Fetch employees for the selected department
        setEmployees(emps);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/salary/add`,
                salary, // Send the salary data
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees"); // Redirect to the salaries page
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while adding the salary.");
            }
        }
    };

    return (
        <>
            {departments && employees ? (
                <div className='max-w-4xl mx-auto mt-10 bg-teal-50 p-10 rounded-lg shadow-2xl'>
                    <h2 className='text-4xl font-bold text-teal-700 mb-10 text-center'>Add Salary</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Department */}
                            <div>
                                <label htmlFor='department' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Department
                                </label>
                                <select
                                    name='department'
                                    onChange={handleDepartmentChange}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div>
                                <label htmlFor='employeeId' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Employee
                                </label>
                                <select
                                    name='employeeId'
                                    onChange={handleChange}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.employeeId} - {emp.userId.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Basic Salary */}
                            <div>
                                <label htmlFor='basicSalary' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Basic Salary
                                </label>
                                <input
                                    type='number'
                                    id='basicSalary'
                                    name='basicSalary'
                                    onChange={handleChange}
                                    placeholder='Basic Salary'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Allowances */}
                            <div>
                                <label htmlFor='allowances' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Allowances
                                </label>
                                <input
                                    type='number'
                                    name='allowances'
                                    onChange={handleChange}
                                    placeholder='Allowances'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Deductions */}
                            <div>
                                <label htmlFor='deductions' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Deductions
                                </label>
                                <input
                                    type='number'
                                    name='deductions'
                                    onChange={handleChange}
                                    placeholder='Deductions'
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Pay Date */}
                            <div>
                                <label htmlFor='payDate' className='block text-sm font-semibold text-teal-800 mb-2'>
                                    Pay Date
                                </label>
                                <input
                                    type='date'
                                    name='payDate'
                                    onChange={handleChange}
                                    className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-full">
                                <button
                                    type='submit'
                                    className='w-full mt-8 bg-teal-600 hover:bg-teal-700 font-bold py-3 px-4 rounded-lg text-white transition duration-300 shadow-lg hover:shadow-xl'
                                >
                                    Add Salary
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : <div>Loading....</div>}
        </>
    );
};

export default Add;