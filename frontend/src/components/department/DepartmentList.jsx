import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    //fetch the data from database so we use usestate
    const[departments,setDepartments]=useState([]);
    const [depLoading,setDepLoading]=useState(false);
    const[filterdepartments,setFilterDepartments]=useState([])

    const onDepartmentDelete = (id) => {
        // Filter out the deleted department
        const updatedDepartments = departments.filter(dep => dep._id !== id);
        setDepartments(updatedDepartments); // Update state with the filtered list
        console.log("Updated departments list after delete:", updatedDepartments); // Debugging
    };

    useEffect(()=>{
        const fetchDepartments=async()=>{

            setDepLoading(true);
            try{
                const response=await axios.get('http://localhost:5000/api/department',{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(response.data.success){
                    let sno=1;
                    console.log(response.data.departments)
                    //preparing the data 
                    const data=await response.data.departments.map((dep)=>(
                        {
                            _id:dep._id,
                            sno:sno++,
                            dep_name:dep.dep_name,
                            action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                        }
                    ))
                setDepartments(data);
                setFilterDepartments(data)

                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }finally{
                setDepLoading(false);
            }
        };
        fetchDepartments();
    },[])




    const filterDepartments=(e)=>{
        const query=e.target.value.toLowerCase();
        const records =departments.filter((dep)=>
        dep.dep_name.toLowerCase().includes(query))
        setFilterDepartments(records)

    }
  return (
    <>{depLoading ?<div>Loading....</div>:
    <div className='p-5'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Departments </h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type='text'
            placeholder='Search by Dep Name'
            className='px-4 py-0.5'
            onChange={filterDepartments}
            />
            <Link to="/admin-dashboard/add-department" 
            className='px-4 py-1 bg-teal-600 rounded text-white border'>
                Add New Department</Link>
        </div>

        <div>
            <DataTable   
            className='mt-7'         
            columns={columns}
            data={filterdepartments}
            pagination
            />
        </div>
    </div>
    }</>
  )
}

export default DepartmentList