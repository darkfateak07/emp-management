const Employee = require('../models/Employee');
const Department = require('../models/Department');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, joiningDate } = req.body;

    if (!name || !email || !department || !salary || !joiningDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const employee = new Employee({
      name,
      email,
      department,
      salary,
      joiningDate,
    });

    await employee.save();
    await employee.populate('department');

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } }
      : {};

    const employees = await Employee.find(filter).populate('department');
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('department');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, joiningDate } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department, salary, joiningDate },
      { new: true }
    ).populate('department');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};

exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting employee count', error: error.message });
  }
};

exports.getDepartmentCount = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting department count', error: error.message });
  }
};
