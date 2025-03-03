const express = require("express");
const router = express.Router();
const userController = require("../controller/users/userController");
const upload = require("../config/upload"); 
const authenticate = require("../middleware/authenticate"); 
const isAdmin = require("../middleware/isAdmin");

// Define routes
router.post("/register", userController.registrationHandler); 
router.post("/login", userController.loginHandler);

// Admin check route
router.get("/admin/check", authenticate, isAdmin, (req, res) => {
  res.json({ success: true, isAdmin: true });
});

// API endpoint to fetch data
router.get('/api/orders-summary', (req, res) => {
  const query = `
    SELECT 
      status, 
      COUNT(*) as count 
    FROM 
      orders 
    GROUP BY 
      status
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Session check
router.get("/check-session", (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      isLoggedIn: true,
      userId: req.session.userId,
      role: req.session.role,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).send({ message: "Logged out successfully" });
  });
});

module.exports = router; // Export the router for use in app.js
