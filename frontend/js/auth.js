const API_URL = 'http://localhost:5000/api';

function switchTab(tab) {
  document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  if (tab === 'login') {
    document.getElementById('loginForm').classList.add('active');
    document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
  } else {
    document.getElementById('signupForm').classList.add('active');
    document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
  }
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showLoginError('Email and password are required');
    return;
  }

  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      } else {
        showLoginError(data.message || 'Login failed');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      showLoginError('Cannot connect to server. Is backend running on port 5000?');
    });
}

function handleSignup(e) {
  e.preventDefault();

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) {
    showSignupError('All fields are required');
    return;
  }

  fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      } else {
        showSignupError(data.message || 'Signup failed');
      }
    })
    .catch(error => {
      console.error('Signup error:', error);
      showSignupError('Cannot connect to server. Is backend running on port 5000?');
    });
}

function showLoginError(message) {
  const errorDiv = document.getElementById('loginError');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

function showSignupError(message) {
  const errorDiv = document.getElementById('signupError');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
