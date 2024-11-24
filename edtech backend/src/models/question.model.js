import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  options: [
    {
      type: String,
      required: true,
    }
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 1,  // Ensure marks are not less than 1
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',  // Reference to the Quiz model
    required: true,
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'], // Question types
    default: 'multiple-choice',
    required: true,
  },
}, { timestamps: true });

// Create and export the Question model
const Question = mongoose.model('Question', questionSchema);
export default Question;
