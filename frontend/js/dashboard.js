async function loadDashboardData() {
  try {
  const [empData, deptData] = await Promise.all([
      apiCall('/employees'),
      apiCall('/departments'),
    ]);

    const employees = empData.employees || [];
    const departments = deptData.departments || [];

    document.getElementById('totalEmployees').textContent = employees.length || 0;
    document.getElementById('totalDepartments').textContent = departments.length || 0;

    // Display department-wise employee count
    displayDepartmentEmployeeCount(employees, departments);

    // Display recent employees
    displayRecentEmployees(employees);
  } catch (error) {
    console.error('Error loading dashboard:', error);
    alert('Error loading dashboard: ' + error.message);
  }
}

function displayDepartmentEmployeeCount(employees, departments) {
  const tbody = document.getElementById('deptEmployeeTable');
  tbody.innerHTML = '';

  const deptCounts = {};
  departments.forEach(dept => {
    deptCounts[dept._id] = { name: dept.name, count: 0 };
  });

  employees.forEach(emp => {
    if (deptCounts[emp.department._id]) {
      deptCounts[emp.department._id].count++;
    }
  });

  if (Object.keys(deptCounts).length === 0) {
    tbody.innerHTML = '<tr><td colspan="2" class="text-center">No departments found</td></tr>';
    return;
  }

  Object.values(deptCounts).forEach(dept => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dept.name}</td>
      <td>${dept.count}</td>
    `;
    tbody.appendChild(row);
  });
}

function displayRecentEmployees(employees) {
  const tbody = document.getElementById('recentEmployeesTable');
  tbody.innerHTML = '';

  if (employees.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No employees found</td></tr>';
    return;
  }

  const recentEmployees = employees.slice(0, 5);

  recentEmployees.forEach(emp => {
    const row = document.createElement('tr');
    const joiningDate = new Date(emp.joiningDate).toLocaleDateString();
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department.name}</td>
      <td>$${emp.salary.toLocaleString()}</td>
      <td>${joiningDate}</td>
    `;
    tbody.appendChild(row);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setAdminName();
  loadDashboardData();
});
