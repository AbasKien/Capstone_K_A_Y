<template>
  <div class="auth-page">
    <header class="navbar">
      <h1 class="brand">Domus Architecture</h1>
      <div class="search-bar">
        <input type="text" placeholder="Tracking Number" v-model="trackingNumber" />
        <button @click="searchTrackingNumber">Search</button>
      </div>
    </header>

    <div class="container">
      <!-- Guest Document Submission -->
      <div class="form-section">
        <h2>Submit Document (For Guest)</h2>
        <form class="document-form" @submit.prevent="submitDocument">
          <label>From:</label>
          <input type="text" v-model="document.fullName" placeholder="Full Name" required />

          <label>Office:</label>
          <input type="text" v-model="document.office" placeholder="Office" required />

          <label>Document Type:</label>
          <select v-model="document.type" required>
            <option value="" disabled selected>-- Select Document Type --</option>
            <option value="plan">Blueprint/Plan</option>
            <option value="permit">Permit Request</option>
          </select>

          <label>Details:</label>
          <textarea v-model="document.details" placeholder="Description, Date, Destination" required></textarea>

          <label>Purpose:</label>
          <input type="text" v-model="document.purpose" placeholder="Purpose" required />

          <label>To:</label>
          <select v-model="document.receivingOffice" required>
            <option value="" disabled selected>Receiving Office</option>
            <option value="admin">Administration</option>
            <option value="design">Design Team</option>
          </select>

          <div class="form-actions">
            <button type="submit" class="submit">Submit</button>
          </div>
        </form>
      </div>

      <!-- Registered User Login -->
      <div class="auth-section">
        <h2>Login (For Registered Users)</h2>
        <form class="auth-form" @submit.prevent="handleLogin">
          <label>Email:</label>
          <input type="email" v-model="email" placeholder="Email" required />

          <label>Password:</label>
          <input type="password" v-model="password" placeholder="Password" required />

          <div class="form-actions">
            <button type="submit" class="submit" :disabled="isLoading">
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      error: null,
      trackingNumber: '',
      document: {
        fullName: '',
        office: '',
        type: '',
        details: '',
        purpose: '',
        receivingOffice: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post("http://localhost:5555/login", {
          email: this.email,
          password: this.password,
        }, { withCredentials: true });

        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        const role = response.data.role;
        const allowedRoles = ['admin', 'Lead architect', 'Secretary', 'Book keeper', 'Liaison', 'Apprentice'];
        if (allowedRoles.includes(role)) {
          this.$router.push("/home");
        } else {
          this.$router.push("/admin/dashboard");
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
    async submitDocument() {
      try {
        await axios.post("http://localhost:5555/submit-document", this.document);
        alert("Document submitted successfully!");
      } catch (error) {
        console.error("Document submission failed", error);
      }
    },
    searchTrackingNumber() {
      if (this.trackingNumber) {
        alert("Searching for tracking number: " + this.trackingNumber);
      } else {
        alert("Please enter a tracking number.");
      }
    }
  }
};
</script>

<style scoped>
/* General Page Styles */
.auth-page {
  font-family: 'Poppins', sans-serif;
  background: #f5f5f5;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Navbar */
.navbar {
  width: 100%;
  background: #2c7a7b;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  font-size: 1.5rem;
}

.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 4px;
}

.search-bar button {
  background: #ff9800;
  border: none;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

/* Main Container */
.container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 30px;
}

/* Form Sections */
.form-section, .auth-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 48%;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
}

/* Inputs */
input, select, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 80px;
}

/* Form Buttons */
.form-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.submit {
  background: #2c7a7b;
  color: white;
}

.submit:hover {
  background: #225f5f;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
