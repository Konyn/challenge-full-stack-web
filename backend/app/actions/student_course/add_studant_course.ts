import CoursesStudent from '#models/courses_student'
import Student from '#models/student'
import StudentCourseDto from '../../dtos/student_course_dto.js'

export default class AddStudentCourseAction {
  public async execute(data: StudentCourseDto) {
    const isValid = await this.validade(data)
    if (!isValid) {
      throw new Error('Dados do curso ou estudante não encontrado')
    }
    return await CoursesStudent.create(data)
  }

  private async validade(data: StudentCourseDto) {
    const courseExists = await CoursesStudent.query().where('id', data.courseId).first()
    const studentExists = await Student.query().where('id', data.studentId).first()
    return !!(courseExists && studentExists)
  }
}
