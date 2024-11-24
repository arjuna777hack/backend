import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',  // Reference to the Question model
      required: true,
    }
  ],
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',  // Reference to the Lesson model where the quiz belongs
    required: true,
  },
  passMark: {
    type: Number,
    required: true,
    min: 0,  // Ensure the pass mark is not negative
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 0,  // Ensure the total marks is not negative
  },
  duration: {
    type: Number,  // Duration in minutes
    required: true,
    min: 1,  // Ensure a minimum duration of 1 minute
  },
}, { timestamps: true });

// Create and export the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
