import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';
import { LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';

const Table = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('API Response:', response.data); // Debugging

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || 'N/A', // Vérifiez si la propriété existe
          name: leave.employeeId?.userId?.name || 'N/A', // Vérifiez si la propriété existe
          department: leave.employeeId?.department?.dep_name || 'N/A', // Vérifiez si la propriété existe
          days:
            (new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) /
            (1000 * 60 * 60 * 24), // Calcul des jours
          status: leave.status || 'N/A', // Vérifiez si la propriété existe
          action: <LeaveButtons _id={leave._id} />,
        }));
        console.log('Mapped Data:', data); // Debugging
        setLeaves(data);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error); // Debugging
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {leaves.length > 0 ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="px-4 py-0.5 border"
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Approved
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700">
                Rejected
              </button>
            </div>
          </div>

          <DataTable columns={columns} data={leaves} pagination />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;