import User from '@/Model/User.model'
import Teacher from '@/Model/Teacher.model'
const Course = require('@/Model/Course.model')
module.exports = {
  register: async (req, res) => {
    const { classId } = req.body;
    const { id } = req.user;
    try {
      const courseRegister = await Course.findById(classId);
      if (!courseRegister) {
        return res.status(404).json({ message: 'not found class' });
      }
      Teacher.findOneAndUpdate(
        { mgv: courseRegister.teacher.toUpperCase() },
        { $push: { 'class.$[elem].students': { student: id } } },
        {
          arrayFilters: [{ 'elem.course': classId }],
          new: true, // Trả về đối tượng giáo viên sau khi đã cập nhật
        }
      )
        .then((updatedTeacher) => {
          return res.status(200).json({ data: updatedTeacher });
        })
        .catch((error) => {
          return res.status(400).json({ mesage: 'Something wrong!!' });
        });
    } catch (error) {
      console.log(error)
      res.status(522).json({ message: JSON.stringify(error)})
    }
  }
}