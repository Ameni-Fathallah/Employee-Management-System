import axios from "axios";
import { useNavigate } from "react-router-dom"



//we create this page because from the database we can charge only the data , no the columns 
//define all the columns 
export const columns=[

    {
        name:" S No",
        selector:(row)=>row.sno//column name that it is fetching from the database 
    },
    {
        name:"Department Name",
        selector:(row)=>row.dep_name,
        sortable:true
    },{
        name:"Action",
        selector:(row)=>row.action
    },
]

export const DepartmentButtons=({_id,onDepartmentDelete})=>{
    const Navigate=useNavigate();

    const handleDelete=async(id)=>{
        const confirm=window.confirm("Do you want to delete ?")
        if(confirm){
        try {
           
                
            // Make GET request to retrieve department details
            //api is for dataa access
            const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Attach auth token
                }
            });
            // Set department data if request is successful
            if (response.data.success) {
                onDepartmentDelete(id);
                console.log('successfully deleted ')
            }
        }catch (error) {
            // Display error message if request fails
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }}
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
            onClick={()=>Navigate(`/admin-dashboard/departments/${_id}`)}>Edit</button>


            <button className="px-3 py-1 bg-red-600  text-white rounded"
            onClick={()=>handleDelete(_id)}>Delete</button>
            
        </div>
    )
}