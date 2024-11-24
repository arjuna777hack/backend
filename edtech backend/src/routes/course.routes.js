import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/unifiedController.js";

import { verifyJWT } from "../middlewares/auth.middleware.js"; // Middleware for authentication
import { upload } from "../middlewares/multer.middleware.js"; // Middleware for file uploads if needed

const router = Router();

// === Course Routes ===
router
  .route("/courses")
  .get(getCourses)                         // Public: Get all courses
  .post(verifyJWT, createCourse);          // Secured: Create a course

router
  .route("/courses/:id")
  .get(getCourseById)                      // Public: Get course by ID
  .put(verifyJWT, updateCourse)            // Secured: Update a course
  .delete(verifyJWT, deleteCourse);        // Secured: Delete a course

// === Lesson Routes ===
router
  .route("/lessons")
  .get(getLessons)                         // Public: Get all lessons
  .post(verifyJWT, createLesson);          // Secured: Create a lesson

router
  .route("/lessons/:id")
  .get(getLessonById)                      // Public: Get lesson by ID
  .put(verifyJWT, updateLesson)            // Secured: Update a lesson
  .delete(verifyJWT, deleteLesson);        // Secured: Delete a lesson

// === Question Routes ===
router
  .route("/questions")
  .get(getQuestions)                       // Public: Get all questions
  .post(verifyJWT, createQuestion);        // Secured: Create a question

router
  .route("/questions/:id")
  .get(getQuestionById)                    // Public: Get question by ID
  .put(verifyJWT, updateQuestion)          // Secured: Update a question
  .delete(verifyJWT, deleteQuestion);      // Secured: Delete a question

// === Quiz Routes ===
router
  .route("/quizzes")
  .get(getQuizzes)                         // Public: Get all quizzes
  .post(verifyJWT, createQuiz);            // Secured: Create a quiz

router
  .route("/quizzes/:id")
  .get(getQuizById)                        // Public: Get quiz by ID
  .put(verifyJWT, updateQuiz)              // Secured: Update a quiz
  .delete(verifyJWT, deleteQuiz);          // Secured: Delete a quiz

export default router;
