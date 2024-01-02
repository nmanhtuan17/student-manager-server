const Course = require('../../Model/Course.model')
const Encrypt = require('../../Utils/encryption')
module.exports = {
  getAllCourse: async (req, res) => {
    try {
      const courses = await Course.find({})
      res.status(200).json({ data: courses })
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  },

  getCourse: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findById(id)
      if (!course) return res.status(404).json({ message: "Course not found" })
      return res.status(200).json({ data: course })
    }
    catch (e) {
      console.log(e)
      res.status(500).json('Server error')
    }
  },

  createCourse: async (req, res) => {
    const { name, mm, codeName, jd, shift, room, tc, teacher } = req.body
    try {
      const validCourse = await Course.findOne({ name, mm, codeName, jd, shift, room, tc, teacher })
      if (validCourse) {
        res.status(400).json({ message: 'Course already exists' })
        return;
      }
      const newCourse = new Course({
        name, mm, codeName,
        time: {
          jd, shift
        }
        ,
        room, tc, teacher
      })
      await newCourse.save()
      res.status(200).json({ message: 'Create course success', data: { course: newCourse } })
    } catch (err) {
      res.status(500).json('Server error')
    }
  },

  deleteCourse: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findByIdAndDelete(id)
      if (!course) {
        res.status(404).json({ message: 'course not exists' })
        return;
      }
      res.status(200).json({ message: 'Delete course success' })
    } catch (err) {
      res.status(500).json('Server error')
    }
  }
}