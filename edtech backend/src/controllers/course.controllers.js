import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Question from '../models/Question.js';
import Quiz from '../models/Quiz.js';

// Helper function to handle errors
const handleError = (res, error) => res.status(400).json({ error: error.message });

// === CRUD Operations for Courses ===
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons instructorId');
    res.status(200).json(courses);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons instructorId');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// === CRUD Operations for Lessons ===
export const createLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    handleError(res, error);
  }
};

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('courseId instructorId quiz');
    res.status(200).json(lessons);
  } catch (error) {
    handleError(res, error);
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('courseId instructorId quiz');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// === CRUD Operations for Questions ===
export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('quizId');
    res.status(200).json(questions);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('quizId');
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// === CRUD Operations for Quizzes ===
export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions lessonId');
    res.status(200).json(quizzes);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions lessonId');
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
