import mongoose from 'mongoose';

const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,  // Cloudinary or other video URL
    default: '',
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',  // Reference to the Course model
    required: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser',  // Reference to the Instructor (User model)
    required: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',  // Reference to a Quiz model if quizzes are part of lessons
  },
  notes: {
    type: String,  // Additional notes for the lesson
    default: '',
  },
}, { timestamps: true });

// Create and export the Lesson model
const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
