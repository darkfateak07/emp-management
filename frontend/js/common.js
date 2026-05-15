const API_URL = 'http://localhost:5000/api';

async function apiCall(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
}

function setAdminName() {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const adminNameEl = document.getElementById('adminName');
      if (adminNameEl) {
        adminNameEl.textContent = user.name || 'Admin';
      }
    }
  } catch (error) {
    console.error('Error setting admin name:', error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = 'dashboard.html';
    }
  } else {
    checkAuth();
    setAdminName();
  }
});
