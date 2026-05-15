const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const dept = new Department({ name, description });
    await dept.save();

    res.status(201).json({ message: 'Department created successfully', department: dept });
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department', error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department updated successfully', department });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};
