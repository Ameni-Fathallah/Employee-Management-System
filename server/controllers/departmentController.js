import Department from "../db/models/Department.js"; // Ensure path and extension are correct

const getDepartments=async(req,res)=>{
    try{
        //return all the departments data
        const departments=await Department.find()
        return res.status(200).json({success:true,departments})
    }catch(error){
        return res.status(500).json({success:false,error:"Get department server error "})

    }
}




const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        console.log('Received data:', { dep_name, description });

        const newDep = new Department({
            dep_name,
            description
        });

        console.log('Department object to be saved:', newDep); // Log the department before saving

        await newDep.save();
        console.log('Department created successfully');

        return res.status(200).json({ success: true, department: newDep });
    } catch (error) {
        console.error('Error adding department:', error);
        return res.status(500).json({ success: false, error: 'Add Department Server Error' });
    }
};

const getDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const department=await Department.findById({_id:id})
        return res.status(200).json({success:true,department})
    }catch(error){
        return res.status(500).json({success:false,error:"Get department server error "})
    }
}

const updateDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const{dep_name,description}=req.body;
        const updateDep=await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        },
        {new:true}
    )
    if (!updateDep) {
        return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, data: updateDep });
    
    }catch(error){
        return res.status(500).json({success:false,error:"Edit department server error "})

    }
}


const deleteDepartment=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteDep=await Department.findByIdAndDelete({_id:id})

    return res.status(200).json({ success: true, data: deleteDep });
    
    }catch(error){
        return res.status(500).json({success:false,error:"Delete department server error "})

    }
}

export {addDepartment,getDepartments,getDepartment,deleteDepartment,updateDepartment}