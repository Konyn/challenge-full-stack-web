import type { HttpContext } from '@adonisjs/core/http'
import AddStudantCourseAction from '../actions/student_course/add_studant_course.js'
import { studentCourseValidator } from '#validators/student_course'
import GetStudantsCourseAction from '../actions/student_course/get_studants_course.js'

export default class StudentsCoursesController {
  async addStudent({ request, response }: HttpContext) {
    const data = await request.validateUsing(studentCourseValidator)
    try {
      const result = await new AddStudantCourseAction().execute(data)
      return response.created({
        status: 201,
        message: 'Estudante adicionado ao curso com sucesso',
        data: result,
      })
    } catch (error) {
      return response.badRequest({ status: 400, error: 'Dados do curso não encontrado' })
    }
  }

  public async getStudentsCourse({ params, response }: HttpContext) {
    try {
      const courseStudent = await new GetStudantsCourseAction().execute(params.id)
      return response.ok({
        status: 200,
        course: {
          id: courseStudent?.course.id,
          name: courseStudent?.course.name,
        },
        student: courseStudent?.student,
      })
    } catch (error) {
      return response.notFound({ status: 404, error: 'Dados do curso não encontrado' })
    }
  }
}
