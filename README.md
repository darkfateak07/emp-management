# Employee Management System

Complete 5-module employee management system with HTML/CSS/JS frontend and Node.js/Express backend using MongoDB.

## Modules Overview

### Module 1: Authentication
- ✅ Signup form (admin registers with name, email, password)
- ✅ Login form (authenticates against database)
- ✅ Passwords hashed using bcryptjs
- ✅ Login state maintained via JWT tokens
- ✅ Logout functionality clears session

### Module 2: Employee CRUD
- ✅ Add new employee (name, email, department, salary, joining date)
- ✅ List all employees in table view
- ✅ Edit existing employee details
- ✅ Delete employee with confirmation
- ✅ Search employees by name

### Module 3: Database Design
- ✅ Users table (auth data)
- ✅ Employees table (with FOREIGN KEY to Departments)
- ✅ Departments table (with pre-seeded data)
- ✅ MongoDB collections for all three

### Module 4: REST API
All endpoints return proper HTTP status codes and JSON responses:
- POST /api/auth/signup - Register new admin
- POST /api/auth/login - Admin login
- POST /api/auth/logout - Admin logout
- GET /api/employees - List all employees (protected)
- POST /api/employees - Create employee (protected)
- PUT /api/employees/:id - Update employee (protected)
- DELETE /api/employees/:id - Delete employee (protected)
- GET /api/departments - List all departments (protected)
- POST /api/departments - Create department (protected)
- PUT /api/departments/:id - Update department (protected)
- DELETE /api/departments/:id - Delete department (protected)

### Module 5: Dashboard UI
- ✅ Protected dashboard page (redirects if not logged in)
- ✅ Summary cards (Total Employees, Total Departments)
- ✅ Department-wise employee count chart/table
- ✅ Employees table with search functionality
- ✅ Clean, responsive layout for laptop screens
- ✅ Admin name and logout button visible

## Project Structure

```
entires/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Employee.js        # Employee schema with FOREIGN KEY
│   │   └── Department.js      # Department schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── employees.js       # Employee routes
│   │   └── departments.js     # Department routes
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── departmentController.js
│   ├── server.js              # Main server file
│   └── package.json
└── frontend/
    ├── index.html             # Login/Signup page
    ├── dashboard.html         # Dashboard
    ├── employees.html         # Employee management
    ├── departments.html       # Department management
    ├── css/
    │   └── style.css          # Main styles
    └── js/
        ├── auth.js            # Auth logic
        ├── dashboard.js       # Dashboard logic
        ├── employees.js       # Employee CRUD
        └── departments.js     # Department CRUD
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running on localhost:27017

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Start a local web server (you can use Python or Node.js http-server):

Using Python:
```bash
python -m http.server 8000
```

Or using http-server (npm):
```bash
npx http-server
```

3. Open your browser and go to:
```
http://localhost:8000
```

## MongoDB Connection

The application uses MongoDB connection string: `mongodb://localhost:27017/employee_management`

Make sure MongoDB is running locally before starting the backend server.

## Default Testing Credentials

After running, you can:
1. Create a new admin account via Sign Up
2. Login with those credentials

## Features

- **Module 1 (Authentication)**: Secure login/signup with password hashing
- **Module 2 (CRUD)**: Full employee management (Create, Read, Update, Delete)
- **Module 3 (Database)**: Normalized MongoDB schema with relationships
- **Module 4 (API)**: RESTful API with proper error handling and status codes
- **Module 5 (UI)**: Responsive dashboard with all required features

## Technologies Used

### Backend
- Express.js (REST API framework)
- MongoDB (Database)
- Mongoose (ODM)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- CORS (Cross-origin support)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API

All features are fully functional and production-ready!
