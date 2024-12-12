import Course from '#models/course'
import CoursesStudent from '#models/courses_student'
import Student from '#models/student'

export default class GetStudantsCourseAction {
  public async execute(id: number) {
    const courseStudent = await CoursesStudent.findOrFail(id)
    if (!courseStudent) {
      throw new Error('Dados do curso não encontrado')
    }
    const course = await Course.findOrFail(courseStudent.courseId)
    const student = await Student.findOrFail(courseStudent.studentId)

    if (course && student) {
      return { course, student }
    }
    return null
  }
}
