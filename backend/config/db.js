const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/employee_management';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
