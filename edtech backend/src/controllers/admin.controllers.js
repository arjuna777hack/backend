import AdminUser from '../models/AdminUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Admin Registration
export const registerAdmin = async (req, res) => {
  const { username, email, fullname, password } = req.body;
  
  try {
    // Check if the admin already exists
    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user
    const newAdmin = new AdminUser({
      username,
      email,
      fullname,
      password: hashedPassword,
      avatar: req.files.avatar[0].path, // Assuming you are uploading an avatar
    });

    // Save the new admin user
    await newAdmin.save();

    // Generate JWT tokens
    const accessToken = newAdmin.generateAccessToken();
    const refreshToken = newAdmin.generateRefreshToken();

    // Send response with token and admin details
    res.status(201).json({
      message: 'Admin registered successfully',
      token: accessToken,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        fullname: newAdmin.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT tokens
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    // Send response with tokens and admin info
    res.status(200).json({
      message: 'Admin logged in successfully',
      token: accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Admin refresh token route
export const refreshAdminToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await AdminUser.findById(decoded._id);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = admin.generateAccessToken();
    const newRefreshToken = admin.generateRefreshToken();

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error refreshing token', error });
  }
};
