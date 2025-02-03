import Employee from "../db/models/Employee.js"
import Leave from "../db/models/Leave.js"

const addLeave=async(req,res)=>{
    try{
        const {userId,leaveType,startDate,endDate,reason}=req.body
        const employee = await Employee.findOne({userId})
        const newLeave=new Leave({
            employeeId:employee._id,leaveType,startDate,endDate,reason
        })

        await newLeave.save()
        return res.status(200).json({success:true})
    }catch(error){
        return res.status(500).json({success:false,error:"Leave add server error"})        
    }

}

const getLeave=async(req,res)=>{
    try{
        const {id}=req.params;
        const employee=await Employee.findOne({userId:id})
        const leaves=await Leave.find({employeeId:employee._id})
        return res.status(200).json({success:true,leaves})

    }catch(error){
        return res.status(500).json({success:false,error:"Leave add server error"})        
    }
}
const getLeaves=async(req,res)=>{
    try{
        const leaves=await Leave.find().populate({
            path:"employeeId",//beacuse it is used as a reference in the employee table
            populate:[
                {path:'department',
                select:'dep_name'},
                {
                    path:'userId',//because the employee collection has connection with user through userId column
                    select:'name'//because i wanna to return juste the name of employee
                }//because employee has a connection with user and department collection 
            ]
        })
        return res.status(200).json({success:true,leaves})

    }catch(error){
        return res.status(500).json({success:false,error:"Leave add server error"})        
    }
}
export {addLeave,getLeave,getLeaves};