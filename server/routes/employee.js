import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure the path is correct
import { addEmployee ,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesById} from '../controllers/employeeController.js';

const router = express.Router();

//call the api employee and return the data from serverside 
router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware,upload.single('image'), addEmployee);
router.get('/:id', authMiddleware, getEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware, fetchEmployeesById);


export default router; // departmentRouter



/*A POST request is sent to /add.
authMiddleware:
Verifies the user's authentication.
If valid, proceeds to the next step.
If invalid, responds with an error (e.g., 401 Unauthorized).
addDepartment:
Processes the request to add a department.
Sends a response back to the client.*/