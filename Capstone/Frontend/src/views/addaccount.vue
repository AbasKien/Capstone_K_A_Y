<template>
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="brand">Domus Architecture</div>
        <nav>
          <ul>
            <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
            <li><router-link to="/admin/add-account">Add Account</router-link></li>
            <li><a href="#">User Management</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
        <button @click="logout" class="logout-button">Logout</button>
      </aside>
      
      <!-- Main Content -->
      <div class="main-content">
        <header class="top-nav">
          <h1>Admin Dashboard</h1>
        </header>
        
        <section class="content">
          <h2>Create New User</h2>
          <form @submit.prevent="register" class="user-form">
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input type="text" id="fullname" v-model="fullname" required />
            </div>
  
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" required />
            </div>
  
            <div class="form-group">
              <label for="role">Role</label>
              <select id="role" v-model="role" required>
                <option value="admin">Admin</option>
                <option value="Lead architect">Lead Architect</option>
                <option value="Secretary">Secretary</option>
                <option value="Book keeper">Book Keeper</option>
                <option value="Liaison">Liaison</option>
                <option value="Apprentice">Apprentice</option>
              </select>
            </div>
  
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" required />
            </div>
  
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Creating...' : 'Create User' }}</button>
          </form>
          <p v-if="error" class="error">{{ error }}</p>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        fullname: '',
        email: '',
        role: 'admin',
        password: '',
        isLoading: false,
        error: null,
      };
    },
    methods: {
      async register() {
        if (!this.fullname || !this.email || !this.password) {
          this.error = 'All fields are required';
          return;
        }
        this.isLoading = true;
        this.error = null;
        try {
          const response = await axios.post('http://localhost:5555/register', {
            fullname: this.fullname,
            email: this.email,
            role: this.role,
            password: this.password,
          });
          if (response.status === 200) {
            alert('User registered successfully!');
            this.fullname = '';
            this.email = '';
            this.role = 'admin';
            this.password = '';
          }
        } catch (err) {
          this.error = err.response?.data?.message || 'Error registering user';
        } finally {
          this.isLoading = false;
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    background: #2f7d78;
    color: white;
    padding: 20px;
  }
  
  .sidebar .brand {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar nav ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar nav ul li {
    margin: 15px 0;
  }
  
  .sidebar nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  .logout-button {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background: #f39c12;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background: #e67e22;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
    background: #ecf0f1;
  }
  
  .top-nav {
    background: #2f7d78;
    color: white;
    padding: 15px;
    text-align: center;
    border-radius: 8px;
  }
  
  .content {
    margin-top: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-form .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    background: #2f7d78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background: gray;
    cursor: not-allowed;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  