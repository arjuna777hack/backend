import mongoose from 'mongoose';

const { Schema } = mongoose;

// Entrance Question Schema
const entranceQuestionSchema = new Schema(
  {
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
      type: Number,  // Index of the correct option in the options array (e.g., 0, 1, 2, 3)
      required: true,
    },
    explanation: {
      type: String,  // Explanation for the correct answer
      required: false,
    },
    testId: {
      type: Schema.Types.ObjectId,  // Reference to the Entrance Test this question belongs to
      ref: 'Entrance',
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the EntranceQuestion model
const EntranceQuestion = mongoose.model('EntranceQuestion', entranceQuestionSchema);
export default EntranceQuestion;
