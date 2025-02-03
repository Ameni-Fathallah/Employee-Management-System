import Salary from "../db/models/Salary.js"
import Employee from "../db/models/Employee.js"; 


const addSalary=async(req,res)=>{
    try{
        const {employeeId,basicSalary,allowances,deductions,payDate}=req.body
        const totalSalary=parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions)
        const newSalary=new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
        })

        await newSalary.save()
        await Employee.findByIdAndUpdate(employeeId, { salary: basicSalary });

        return res.status(200).json({success:true})
    }catch(error){
        return res.status(500).json({success:false,error:"salary add server error"})        
    }
}

const getSalary=async(req,res)=>{
    try{
        const{id}=req.params;
        let salary;
        salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')
        
        if(!salary||salary.length<1){
            const employee = await Employee.findOne({userId:id})
            salary=await Salary.find({employeeId:employee._id}).populate('employeeId','employeeId')
            console.log(salary)
        }
        return res.status(200).json({success:true,salary})

    }catch(error){
        return res.status(500).json({success:false,error:"salary get server error"})        
    }
}
export {addSalary,getSalary}