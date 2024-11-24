import { Router } from 'express';
import { registerAdmin, loginAdmin, refreshAdminToken } from '../controllers/admin.controllers.js';  // Admin controllers for registration, login, token refresh
import { upload } from '../middlewares/multer.middleware.js';  // Optional: Middleware for file uploads (avatar, etc.)
import { verifyJWT } from '../middlewares/auth.middleware.js';  // Optional: Middleware to verify JWT for protected routes

const router = Router();

// Admin registration route
router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
  ]),
  registerAdmin
);

// Admin login route
router.route('/login').post(loginAdmin);

// Secured routes for admin
router.route('/refresh-token').post(refreshAdminToken); // Admin refresh token route

export default router;
