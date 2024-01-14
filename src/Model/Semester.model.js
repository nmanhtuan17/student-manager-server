import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SemesterModel = new Schema({
  userId: {
    type: String,
    require
  },
  semester: {
    type: Number
  },
  group: {
    type: Number
  },
  year: {
    type: Number
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    }
  ],
  tuition: {
    type: Number
  }
});


const Semester = mongoose.model('Semester', SemesterModel);
export default Semester