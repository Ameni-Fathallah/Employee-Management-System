import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import DeleteDepartment from './components/department/DeleteDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';

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
          {/* children  */}
          <Route index element={<AdminSummary/>}></Route>

          {/* department */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
          <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>
          <Route path="/admin-dashboard/departments/:id" element={<DeleteDepartment/>}></Route>
          
          {/* employee */}
          
          <Route path="/admin-dashboard/employees" element={<List/>}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
          <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
          <Route path="/admin-dashboard/leaves" element={<Table/>}></Route>
          </Route>


        <Route path='employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin","employee"]}>
            <EmployeeDashboard />
            </RoleBaseRoutes>
        </PrivateRoutes>}>
        <Route index element={<Summary/>}></Route>
        <Route path="/employee-dashboard/profile/:id" element={<View/>}></Route>
        <Route path="/employee-dashboard/leaves" element={<LeaveList/>}></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
        <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>

        </Route>
      
      </Routes>
    </Router>
  );
};

export default App;