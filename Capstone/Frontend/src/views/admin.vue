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
        <h2>Submit Document</h2>
        <form @submit.prevent="submitDocument" class="document-form">
          <div class="form-group">
            <label for="fullname">From:</label>
            <input type="text" id="fullname" v-model="fullname" required />
          </div>

          <div class="form-group">
            <label for="office">Office:</label>
            <input type="text" id="office" v-model="office" required />
          </div>

          <div class="form-group">
            <label for="documentType">Document Type:</label>
            <select id="documentType" v-model="documentType" required>
              <option value="">-- Select Document Type --</option>
              <option value="report">Report</option>
              <option value="invoice">Invoice</option>
              <option value="memo">Memo</option>
            </select>
          </div>

          <div class="form-group">
            <label for="details">Details:</label>
            <textarea id="details" v-model="details" required></textarea>
          </div>

          <div class="form-group">
            <label for="purpose">Purpose:</label>
            <input type="text" id="purpose" v-model="purpose" required />
          </div>

          <div class="form-group">
            <label for="to">To:</label>
            <select id="to" v-model="to" required>
              <option value="receiving">Receiving Office</option>
              <option value="processing">Processing Office</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: '',
      office: '',
      documentType: '',
      details: '',
      purpose: '',
      to: 'receiving'
    };
  },
  methods: {
    submitDocument() {
      alert('Document submitted successfully!');
      this.fullname = '';
      this.office = '';
      this.documentType = '';
      this.details = '';
      this.purpose = '';
      this.to = 'receiving';
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
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

.document-form .form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input, select, textarea {
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
</style>
