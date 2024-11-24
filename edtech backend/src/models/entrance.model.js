import mongoose from 'mongoose';

const { Schema } = mongoose;

// Entrance Test Schema
const entranceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,  // Reference to EntranceCategory
      ref: 'EntranceCategory',
      required: true,
    },
    duration: {
      type: Number, // Duration of the test in minutes
      required: true,
    },
    passingScore: {
      type: Number, // The minimum score required to pass the test
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,  // Reference to Question model
        ref: 'Question',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId, // Reference to AdminUser who created the entrance test
      ref: 'AdminUser',
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Entrance model
const Entrance = mongoose.model('Entrance', entranceSchema);
export default Entrance;
