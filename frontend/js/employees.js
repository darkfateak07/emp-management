let employees = [];
let departments = [];
let editingEmployeeId = null;
let deleteEmployeeId = null;

// Load employees and departments
async function loadData() {
  try {
    // Fetch departments and employees in parallel
    const [deptData, empData] = await Promise.all([
      apiCall('/departments'),
      apiCall('/employees'),
    ]);

    departments = deptData.departments || [];
    employees = empData.employees || [];

    displayEmployees(employees);
    loadDepartmentOptions();

    if (departments.length === 0) {
      console.warn('No departments found. Please create departments first.');
    }
  } catch (error) {
    console.error('Error loading data:', error);
    alert('Error loading data: ' + error.message);
  }
}

// Display employees in table
function displayEmployees(employeesToDisplay) {
  const tbody = document.getElementById('employeesTable');
  tbody.innerHTML = '';

  if (employeesToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No employees found</td></tr>';
    return;
  }

  employeesToDisplay.forEach(emp => {
    const row = document.createElement('tr');
    const joiningDate = new Date(emp.joiningDate).toLocaleDateString();
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department.name}</td>
      <td>$${emp.salary.toLocaleString()}</td>
      <td>${joiningDate}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-edit" onclick="editEmployee('${emp._id}')">Edit</button>
          <button class="btn-delete" onclick="openDeleteModal('${emp._id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Load department options in select
function loadDepartmentOptions() {
  const select = document.getElementById('empDepartment');
  
  if (!select) {
    console.error('Department select element not found');
    return;
  }
  
  select.innerHTML = '<option value="">Select Department</option>';

  if (departments.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No departments available - Create one first!';
    option.disabled = true;
    select.appendChild(option);
    console.warn('No departments available in dropdown');
    return;
  }

  departments.forEach(dept => {
    const option = document.createElement('option');
    option.value = dept._id;
    option.textContent = dept.name;
    select.appendChild(option);
  });
  
  console.log('Department dropdown loaded with', departments.length, 'departments');
}

// Open add employee modal
function openAddEmployeeModal() {
  editingEmployeeId = null;
  document.getElementById('modalTitle').textContent = 'Add Employee';
  document.getElementById('employeeForm').reset();
  
  // Reload departments to ensure they're up to date
  loadDepartmentOptions();
  
  document.getElementById('employeeModal').classList.add('show');
}

// Open edit employee modal
async function editEmployee(employeeId) {
  editingEmployeeId = employeeId;
  const employee = employees.find(e => e._id === employeeId);

  if (employee) {
    document.getElementById('modalTitle').textContent = 'Edit Employee';
    document.getElementById('empName').value = employee.name;
    document.getElementById('empEmail').value = employee.email;
    document.getElementById('empDepartment').value = employee.department._id;
    document.getElementById('empSalary').value = employee.salary;
    document.getElementById('empJoiningDate').value = employee.joiningDate.split('T')[0];
    document.getElementById('employeeModal').classList.add('show');
  }
}

// Close employee modal
function closeEmployeeModal() {
  document.getElementById('employeeModal').classList.remove('show');
  editingEmployeeId = null;
}

// Handle employee form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('employeeForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('empName').value;
      const email = document.getElementById('empEmail').value;
      const department = document.getElementById('empDepartment').value;
      const salary = document.getElementById('empSalary').value;
      const joiningDate = document.getElementById('empJoiningDate').value;

      if (!name || !email || !department || !salary || !joiningDate) {
        alert('All fields are required');
        return;
      }

      try {
        let url = '/employees';
        let method = 'POST';

        if (editingEmployeeId) {
          url += `/${editingEmployeeId}`;
          method = 'PUT';
        }

        await apiCall(url, method, { name, email, department, salary, joiningDate });

        closeEmployeeModal();
        loadData();
      } catch (error) {
        console.error('Error saving employee:', error);
        alert('Error saving employee: ' + error.message);
      }
    });
  }
});

// Open delete modal
function openDeleteModal(employeeId) {
  deleteEmployeeId = employeeId;
  document.getElementById('deleteModal').classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('show');
  deleteEmployeeId = null;
}

// Confirm delete
async function confirmDelete() {
  try {
    await apiCall(`/employees/${deleteEmployeeId}`, 'DELETE');
    closeDeleteModal();
    loadData();
  } catch (error) {
    console.error('Error deleting employee:', error);
    alert('Error deleting employee: ' + error.message);
  }
}

// Search employees
function searchEmployees() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = employees.filter(emp => emp.name.toLowerCase().includes(query));
  displayEmployees(filtered);
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
  setAdminName();
  loadData();
});
