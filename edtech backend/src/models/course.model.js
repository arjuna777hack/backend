import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  syllabus: {
    type: String,  // Can be a reference to a syllabus model or a string
    required: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',  // Reference to the Lesson model
    }
  ],
  courseImageUrl: {
    type: String,  // Cloudinary URL for the course image
    default: '',
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser',  // Reference to the User model (Instructor)
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);
export default Course;
