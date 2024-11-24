import { Router } from "express";
import {
  createEntranceCategory,
  getEntranceCategories,
} from "../controllers/entranceController.js"; // Importing EntranceCategory controller methods
import {
  createEntrance,
  getEntrances,
  getEntranceById,
  updateEntrance,
  deleteEntrance,
} from "../controllers/entranceController.js"; // Importing Entrance controller methods
import {
  createEntranceQuestion,
  getEntranceQuestions,
  getEntranceQuestionById,
  updateEntranceQuestion,
  deleteEntranceQuestion,
} from "../controllers/entranceController.js"; // Importing EntranceQuestion controller methods
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware to verify JWT

const router = Router();

// === Entrance Category Routes ===
router
  .route("/entrance-categories")
  .get(getEntranceCategories)  // Get all entrance categories
  .post(verifyJWT, createEntranceCategory);  // Create a new entrance category (secured)


// === Entrance Routes ===
router
  .route("/entrances")
  .get(getEntrances)  // Get all entrance tests
  .post(verifyJWT, createEntrance);  // Create a new entrance test (secured)

router
  .route("/entrances/:id")
  .get(getEntranceById)  // Get entrance test by ID
  .put(verifyJWT, updateEntrance)  // Update entrance test by ID (secured)
  .delete(verifyJWT, deleteEntrance);  // Delete entrance test by ID (secured)


// === Entrance Question Routes ===
router
  .route("/entrance-questions")
  .get(getEntranceQuestions)  // Get all entrance questions
  .post(verifyJWT, createEntranceQuestion);  // Create a new entrance question (secured)

router
  .route("/entrance-questions/:id")
  .get(getEntranceQuestionById)  // Get entrance question by ID
  .put(verifyJWT, updateEntranceQuestion)  // Update entrance question by ID (secured)
  .delete(verifyJWT, deleteEntranceQuestion);  // Delete entrance question by ID (secured)

export default router;
