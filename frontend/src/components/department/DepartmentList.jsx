import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filterdepartments, setFilterDepartments] = useState([]);

    // Function to handle department deletion
    const onDepartmentDelete = (id) => {
        const data = departments.filter(dep => dep._id !== id);
        setDepartments(data);
        setFilterDepartments(data);
        console.log("Updated departments list after delete:", data); // Debugging
    };

    // Fetch departments on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                    }));
                    setDepartments(data);
                    setFilterDepartments(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // Function to filter departments based on search query
    const filterDepartments = (e) => {
        const query = e.target.value.toLowerCase();
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(query)
        );
        setFilterDepartments(records);
    };

    return (
        <>
            {depLoading ? <div>Loading....</div> :
                <div className='p-5'>
                    <div className='text-center p-7'>
                        <h3 className='text-3xl font-bold'>Manage Departments</h3>
                    </div>

                    <div className='flex justify-between items-center'>
                        <input
                            type='text'
                            placeholder='Search by Dep Name'
                            className='px-4 py-1'
                            onChange={filterDepartments}
                        />
                        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded text-white border'>
                            Add New Department
                        </Link>
                    </div>

                    <div>
                        <DataTable
                            className='mt-10'
                            columns={columns}
                            data={filterdepartments}
                            pagination
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default DepartmentList;