import mongoose from 'mongoose';

const { Schema } = mongoose;

// Entrance Category Schema
const entranceCategorySchema = new Schema(
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
  },
  { timestamps: true }
);

// Create and export the EntranceCategory model
const EntranceCategory = mongoose.model('EntranceCategory', entranceCategorySchema);
export default EntranceCategory;
