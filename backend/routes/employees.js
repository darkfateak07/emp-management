const express = require('express');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, employeeController.createEmployee);
router.get('/', auth, employeeController.getAllEmployees);
router.get('/count/employees', auth, employeeController.getEmployeeCount);
router.get('/count/departments', auth, employeeController.getDepartmentCount);
router.get('/:id', auth, employeeController.getEmployeeById);
router.put('/:id', auth, employeeController.updateEmployee);
router.delete('/:id', auth, employeeController.deleteEmployee);

module.exports = router;
