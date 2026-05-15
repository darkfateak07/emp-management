const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Department = require('./models/Department');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize default departments
async function initializeDepartments() {
  try {
    const existingDepts = await Department.countDocuments();
    
    if (existingDepts === 0) {
      const defaultDepartments = [
        { name: 'Engineering', description: 'Software development and engineering team' },
        { name: 'Sales', description: 'Sales and business development team' },
        { name: 'HR', description: 'Human Resources team' },
        { name: 'Marketing', description: 'Marketing and communications team' },
        { name: 'Operations', description: 'Operations and support team' },
      ];
      
      await Department.insertMany(defaultDepartments);
      console.log('✅ Default departments created successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing departments:', error.message);
  }
}

// Initialize departments after DB connection
setTimeout(initializeDepartments, 1000);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/departments', require('./routes/departments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
