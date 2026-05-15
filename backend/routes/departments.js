const express = require('express');
const departmentController = require('../controllers/departmentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, departmentController.createDepartment);
router.get('/', auth, departmentController.getAllDepartments);
router.get('/:id', auth, departmentController.getDepartmentById);
router.put('/:id', auth, departmentController.updateDepartment);
router.delete('/:id', auth, departmentController.deleteDepartment);

module.exports = router;
