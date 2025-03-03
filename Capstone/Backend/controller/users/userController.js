const bcrypt = require('bcrypt');
const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const secret = 'your_jwt_secret'; // Replace with your actual secret key
  const options = { expiresIn: '1h' }; // Token expiration time

  return jwt.sign(payload, secret, options);
};

const registrationHandler = (req, res) => {
  const { fullname, email, role, password } = req.body;

  if (!fullname || !email || !role || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  userModel.findByEmail(email, async (err, users) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (users.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      userModel.create({ fullname, email, role, password: hashedPassword }, async (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        res.status(200).json({ message: 'Registration successful. You can now log in.' });
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error hashing password.' });
    }
  });
};

const loginHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  userModel.findByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token (e.g., JWT) and send it back to the client
    const token = generateToken(user);

    res.status(200).json({
      email: user.email,
      role: user.role,
      token,
    });
  });
};

module.exports = {
  registrationHandler,
  loginHandler,
};
