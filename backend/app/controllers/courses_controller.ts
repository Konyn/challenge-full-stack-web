import type { HttpContext } from '@adonisjs/core/http'

import { courseValidator } from '#validators/course'
import CreateCourseAction from '../actions/course/create_course.js'
import UpdateCourseAction from '../actions/course/update_course.js'
import DeleteCourseAction from '../actions/course/delete_course.js'
import CourseByIdAction from '../actions/course/course_by_id.js'
import GetCoursesAction from '../actions/course/get_courses.js'

export default class CoursesController {
  async index({ response }: HttpContext) {
    try {
      const courses = await new GetCoursesAction().execute()
      return response.ok({ status: 200, data: courses })
    } catch (error) {
      return response.badRequest({ status: 400, message: error.message })
    }
  }
  async show({ params, response }: HttpContext) {
    try {
      const course = await new CourseByIdAction().execute(params.id)
      return response.ok({ status: 200, data: course })
    } catch (error) {
      return response.notFound({ status: 404, message: 'Curso não encontrado' })
    }
  }
  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(courseValidator)
    try {
      const course = await new CreateCourseAction().execute(data)
      return response.created({ status: 201, data: course })
    } catch (error) {
      return response.badRequest({ status: 400, message: error.message })
    }
  }

  async update({ request, params, response }: HttpContext) {
    const data = await request.validateUsing(courseValidator)
    try {
      const course = await new UpdateCourseAction().execute(params.id, data)
      return response.ok({ status: 200, data: course })
    } catch (error) {
      return response.badRequest({ status: 400, message: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await new DeleteCourseAction().execute(params.id)
      return response.ok({ status: 200, message: 'Curso deletado com sucesso' })
    } catch (error) {
      return response.notFound({ error: 'Dados do curso não encontrado' })
    }
  }
}
