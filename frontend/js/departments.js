let departments = [];
let editingDepartmentId = null;
let deleteDepartmentId = null;

// Load departments
async function loadDepartments() {
  try {
    const data = await apiCall('/departments');
    departments = data.departments || [];
    displayDepartments(departments);
  } catch (error) {
    console.error('Error loading departments:', error);
    alert('Error loading departments: ' + error.message);
  }
}

// Display departments in table
function displayDepartments(deptsToDisplay) {
  const tbody = document.getElementById('departmentsTable');
  tbody.innerHTML = '';

  if (deptsToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">No departments found</td></tr>';
    return;
  }

  deptsToDisplay.forEach(dept => {
    const row = document.createElement('tr');
    const createdDate = new Date(dept.createdAt).toLocaleDateString();
    row.innerHTML = `
      <td>${dept.name}</td>
      <td>${dept.description || '-'}</td>
      <td>${createdDate}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-edit" onclick="editDepartment('${dept._id}')">Edit</button>
          <button class="btn-delete" onclick="openDeleteModal('${dept._id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Open add department modal
function openAddDepartmentModal() {
  editingDepartmentId = null;
  document.getElementById('modalTitle').textContent = 'Add Department';
  document.getElementById('departmentForm').reset();
  document.getElementById('departmentModal').classList.add('show');
}

// Open edit department modal
function editDepartment(departmentId) {
  editingDepartmentId = departmentId;
  const department = departments.find(d => d._id === departmentId);

  if (department) {
    document.getElementById('modalTitle').textContent = 'Edit Department';
    document.getElementById('deptName').value = department.name;
    document.getElementById('deptDescription').value = department.description || '';
    document.getElementById('departmentModal').classList.add('show');
  }
}

// Close department modal
function closeDepartmentModal() {
  document.getElementById('departmentModal').classList.remove('show');
  editingDepartmentId = null;
}

// Handle department form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('departmentForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('deptName').value;
      const description = document.getElementById('deptDescription').value;

      if (!name) {
        alert('Department name is required');
        return;
      }

      try {
        let url = '/departments';
        let method = 'POST';

        if (editingDepartmentId) {
          url += `/${editingDepartmentId}`;
          method = 'PUT';
        }

        await apiCall(url, method, { name, description });

        closeDepartmentModal();
        loadDepartments();
      } catch (error) {
        console.error('Error saving department:', error);
        alert('Error saving department: ' + error.message);
      }
    });
  }
});

// Open delete modal
function openDeleteModal(departmentId) {
  deleteDepartmentId = departmentId;
  document.getElementById('deleteModal').classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('show');
  deleteDepartmentId = null;
}

// Confirm delete
async function confirmDelete() {
  try {
    await apiCall(`/departments/${deleteDepartmentId}`, 'DELETE');
    closeDeleteModal();
    loadDepartments();
  } catch (error) {
    console.error('Error deleting department:', error);
    alert('Error deleting department: ' + error.message);
  }
}

// Load on page load
window.addEventListener('DOMContentLoaded', () => {
  setAdminName();
  loadDepartments();
});
