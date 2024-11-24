import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure the path is correct
import { addEmployee } from '../controllers/employeeController.js';

const router = express.Router();

//call the api department and return the data from serverside 
// router.get('/', authMiddleware, getDepartments);


// Apply authMiddleware to verify user, then call addDepartment controller function
router.post('/add', authMiddleware, addEmployee);
// router.get('/:id', authMiddleware, getDepartment);
// router.put('/:id', authMiddleware, updateDepartment);
// router.delete('/:id', authMiddleware, deleteDepartment);


export default router; // departmentRouter



/*A POST request is sent to /add.
authMiddleware:
Verifies the user's authentication.
If valid, proceeds to the next step.
If invalid, responds with an error (e.g., 401 Unauthorized).
addDepartment:
Processes the request to add a department.
Sends a response back to the client.*/