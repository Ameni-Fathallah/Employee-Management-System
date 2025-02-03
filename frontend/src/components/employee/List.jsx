import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const[employees,setEmployees]=useState([]);
  const[empLoading,setEmpLoading]=useState(false);
  const[filteredEmloyee,setFilteredEmployees]=useState([])
   //fetch the data from database so we use useEffect
   useEffect(()=>{
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
          const response = await axios.get('http://localhost:5000/api/employee', {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log("API Response:", response.data); // Debugging
  
          if (response.data.success) {
              let sno = 1;
              const data = response.data.employees.map((emp) => ({
                  _id: emp._id,
                  sno: sno++,
                  dep_name: emp.department ? emp.department.dep_name : "N/A",
                  name:emp.userId.name ,
                  dob: new Date(emp.dob).toLocaleDateString(),
                  profileImage: <img width={40} className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`}/> ,
                  action: <EmployeeButtons _id={emp._id} />
              }));
              console.log("Mapped Data:", data); // Debugging
              setEmployees(data);
              setFilteredEmployees(data);
          }
      } catch (error) {
          console.error("Error fetching employees:", error); // Debugging
          if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
          }
      } finally {
          setEmpLoading(false);
      }
  };
    //return the data from the server side 
    fetchEmployees();
},[])

const handleFilter=(e)=>{
    const records =employees.filter((emp)=>(
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records);
}

  return (
    <>{empLoading ?<div>Loading....</div>:

    <div className='p-5'>
        <div className='text-center p-7'>
            <h3 className='text-3xl font-bold '>Manage Employees </h3>
        </div>
        <div className='flex justify-between items-center'>
            <input type='text'
                placeholder='Search by Dep Name'
                className='px-4 py-0.5 border'         
                onChange={handleFilter}
                />
                <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 rounded text-white border'>
                  Add New Employee</Link>
          </div>
            <DataTable 
            className="mt-10" 
            columns={columns} 
            data={filteredEmloyee} 
            pagination/>


    </div>}</>)
}
export default List;