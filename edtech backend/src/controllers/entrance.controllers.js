import Entrance from '../models/Entrance.js';
import EntranceCategory from '../models/EntranceCategory.js';
import EntranceQuestion from '../models/EntranceQuestion.js';

// Entrance Category Controller

// Create a new Entrance Category
export const createEntranceCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const entranceCategory = new EntranceCategory({ name, description });
    await entranceCategory.save();
    res.status(201).json({ message: 'Entrance Category created successfully', entranceCategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Entrance Categories
export const getEntranceCategories = async (req, res) => {
  try {
    const entranceCategories = await EntranceCategory.find();
    res.status(200).json(entranceCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Entrance Controller

// Create a new Entrance Test
export const createEntrance = async (req, res) => {
  try {
    const { name, description, category, duration, passingScore, questions, createdBy } = req.body;
    const entrance = new Entrance({ name, description, category, duration, passingScore, questions, createdBy });
    await entrance.save();
    res.status(201).json({ message: 'Entrance Test created successfully', entrance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Entrance Tests
export const getEntrances = async (req, res) => {
  try {
    const entrances = await Entrance.find().populate('category createdBy');
    res.status(200).json(entrances);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Entrance Test by ID
export const getEntranceById = async (req, res) => {
  try {
    const entrance = await Entrance.findById(req.params.id).populate('category createdBy');
    if (!entrance) {
      return res.status(404).json({ message: 'Entrance Test not found' });
    }
    res.status(200).json(entrance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Entrance Test
export const updateEntrance = async (req, res) => {
  try {
    const entrance = await Entrance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entrance) {
      return res.status(404).json({ message: 'Entrance Test not found' });
    }
    res.status(200).json({ message: 'Entrance Test updated successfully', entrance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Entrance Test
export const deleteEntrance = async (req, res) => {
  try {
    const entrance = await Entrance.findByIdAndDelete(req.params.id);
    if (!entrance) {
      return res.status(404).json({ message: 'Entrance Test not found' });
    }
    res.status(200).json({ message: 'Entrance Test deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Entrance Question Controller

// Create a new Entrance Question
export const createEntranceQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer, explanation, testId } = req.body;
    const entranceQuestion = new EntranceQuestion({ questionText, options, correctAnswer, explanation, testId });
    await entranceQuestion.save();
    res.status(201).json({ message: 'Entrance Question created successfully', entranceQuestion });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Entrance Questions
export const getEntranceQuestions = async (req, res) => {
  try {
    const entranceQuestions = await EntranceQuestion.find().populate('testId');
    res.status(200).json(entranceQuestions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Entrance Question by ID
export const getEntranceQuestionById = async (req, res) => {
  try {
    const entranceQuestion = await EntranceQuestion.findById(req.params.id).populate('testId');
    if (!entranceQuestion) {
      return res.status(404).json({ message: 'Entrance Question not found' });
    }
    res.status(200).json(entranceQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Entrance Question
export const updateEntranceQuestion = async (req, res) => {
  try {
    const entranceQuestion = await EntranceQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entranceQuestion) {
      return res.status(404).json({ message: 'Entrance Question not found' });
    }
    res.status(200).json({ message: 'Entrance Question updated successfully', entranceQuestion });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Entrance Question
export const deleteEntranceQuestion = async (req, res) => {
  try {
    const entranceQuestion = await EntranceQuestion.findByIdAndDelete(req.params.id);
    if (!entranceQuestion) {
      return res.status(404).json({ message: 'Entrance Question not found' });
    }
    res.status(200).json({ message: 'Entrance Question deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
