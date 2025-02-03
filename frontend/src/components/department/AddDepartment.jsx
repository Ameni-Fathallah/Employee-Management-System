import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const[department,setDepartment]=useState({
        dep_name:'',
        description:''}
    );
    
    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{//pass data to the server side (to the department )
            const response=await axios.post('http://localhost:5000/api/department/add',department,{
                headers:{
                    //pass the token to check it is admin or not 
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        }catch(error){
            if(error.response && error.reponse.data.error){
                alert(error.reponse.data.error)
            }
        }
    }
  return (
    <div>
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-6 '>Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='dep_name'
                    className='text-sm font-medium text-gray-700' >
                        Department Name
                    </label>

                    <input
                    name="dep_name"
                    type='text' 
                    placeholder='Enter Dep Name'
                    className='mt-1 pl-2  w-full border border-gray-300 rounded-md'
                    required 
                    onChange={handleChange}
                    />
                </div>
              
                <div className='mt-3'>
                    <label 
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700'
                    >Description
                    </label>
                    
                    <textarea 
                    name='description' 
                    placeholder='Description'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                    rows="4"
                    onChange={handleChange}
                    ></textarea>
                </div>

                <button type='submit'
                className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
            </form>
        </div>

    </div>
  )
}

export default AddDepartment