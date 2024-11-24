import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartments from './components/department/AddDepartments';
import EditDepartment from './components/department/EditDepartment';
import DeleteDepartment from './components/department/DeleteDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
// Import other components

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        


        {/* AdminDashboard  */}
        <Route path="/admin-dashboard" element={//parent Route : Admin-ddahshboard 
          //check the user is login or not
          <PrivateRoutes>
            {/* check the rolebased routes we passed an array including admin this does means that this asmindashboard is accessiblile only for admin */}
              <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
              </RoleBaseRoutes>
          </PrivateRoutes>
        
        }>
          {/* //The summary  so we use Outlet  */}
          {/* By default adminsummary */}
          <Route index element={<AdminSummary/>}></Route>
          {/* children  */}
          {/* department */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartments/>}></Route>
          <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>
          <Route path="/admin-dashboard/departments/:id" element={<DeleteDepartment/>}></Route>
          
          {/* employee */}
          <Route path="/admin-dashboard/employees" element={<List/>}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>

        </Route>


        <Route path='employee-dashboard' element={<EmployeeDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;