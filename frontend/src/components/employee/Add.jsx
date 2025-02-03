import React, { useState,useEffect } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Add = () => {
    const [departments, setDepartments] = useState([]);

    //we create formData to store the data in object 
    const[formData,setFormData]=useState({});
    const navigate=useNavigate(); 
    
    //fetch data from DB
    useEffect(()=>{
        const getDepartments = async () => {
            const departmentsData=await fetchDepartments();//this function imlementes int the EmployeHelper 
            setDepartments(departmentsData);
        };
        getDepartments();
    },[])


    //add fields to the form with the function handlechange
    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name==="image"){//if the name is an object
            setFormData((prevData)=>({...prevData,[name]:files[0]}))
        }else{
            setFormData((prevData)=>({...prevData,[name]:value}))
        }
    }


    //after we fill the form , we calll the submit function in the top of the form 
    //Nb : with the submit  we have to pass our data to ther serverside 
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const formDataObj=new FormData()//we should use formdataobj because e wanna passa file 

        Object.keys(formData).forEach((key)=>{
          formDataObj.append(key,formData[key])//example : key :email/name/... formadata[key] : value
        })

        try{
          const response =await axios.post(
            "http://localhost:5000/api/employee/add",
            formDataObj,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if(response.data.success){
            navigate("/admin-dashboard/employees")
          }
          console.log('yesss')
        }catch (error) {
          // Handle errors
          if (error.response) {
            // Server responded with an error (e.g., 400 Bad Request)
            alert(error.response.data.error || 'An error occurred');
          } else if (error.request) {
            // The request was made but no response was received
            alert('No response from the server. Please try again.');
          } else {
            // Something else went wrong
            alert('An unexpected error occurred. Please try again.');
          }
          console.error('Error:', error);
        }
      };

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-teal-50 p-10 rounded-lg shadow-2xl'>
      <h2 className='text-4xl font-bold text-teal-700 mb-10 text-center'>Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Name */}
          <div>
            <label htmlFor='name' className='block text-sm font-semibold text-teal-800 mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              onChange={handleChange}

              placeholder='Insert Name'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-semibold text-teal-800 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              placeholder='Insert Email'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label htmlFor='employeeId' className='block text-sm font-semibold text-teal-800 mb-2'>
              Employee ID
            </label>
            <input
              type='text'
              id='employeeId'
              name='employeeId'
              onChange={handleChange}
              placeholder='Employee ID'
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
              id='dob'
              name='dob'
              onChange={handleChange}
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor='gender' className='block text-sm font-semibold text-teal-800 mb-2'>
              Gender
            </label>
            <select
              id='gender'
              name='gender'
              onChange={handleChange}
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
              placeholder='Designation'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor='department' className='block text-sm font-semibold text-teal-800 mb-2'>
              Department
            </label>
            <select
              name='department'
              onChange={handleChange}
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
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
              placeholder='Salary'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='block text-sm font-semibold text-teal-800 mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='*********'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor='role' className='block text-sm font-semibold text-teal-800 mb-2'>
              Role
            </label>
            <select
              onChange={handleChange}
              name='role'
              className='mt-1 p-3 block w-full border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-200'
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor='image' className='block text-sm font-semibold text-teal-800 mb-2'>
              Upload Image
            </label>
            <input
              type='file'
              onChange={handleChange}
              name='image'
              accept='image/*'
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
              Add Employee
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default Add;
