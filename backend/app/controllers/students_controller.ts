import type { HttpContext } from '@adonisjs/core/http'
import CreateStudantAction from '../actions/student/create_student.js'
import GetStudentsAction from '../actions/student/get_students.js'
import GetStudentByIdAction from '../actions/student/get_student_by_id.js'
import UpdateStudentAction from '../actions/student/update_student.js'
import DeleteStudentAction from '../actions/student/delete_student.js'
import { editStudentValidator, studentValidator } from '#validators/student'

export default class StudentsController {
  async index({ auth, response }: HttpContext) {
    try {
      auth.getUserOrFail()
      const students = await new GetStudentsAction().execute()
      return response.ok({ status: 200, data: students })
    } catch (error) {
      return response.badRequest({ status: 400, message: 'Algo deu errado' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const studantId = await new GetStudentByIdAction().execute(params.id)
      return response.ok({ status: 200, data: studantId })
    } catch (error) {
      return response.notFound({ status: 404, message: 'Estudante não encontrado' })
    }
  }

  async create({ request, response }: HttpContext) {
    const studantData = await request.validateUsing(studentValidator)
    try {
      const studant = await new CreateStudantAction().execute(studantData)
      return response.created({
        status: 201,
        message: 'Estudante criado com sucesso',
        data: studant,
      })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: 'Erro ao criar estudante',
        erro: error.message,
      })
    }
  }

  async update({ request, params, response }: HttpContext) {
    const studantData = await request.validateUsing(editStudentValidator)
    try {
      const studant = await new GetStudentByIdAction().execute(params.id)
      if (!studant) {
        return response.notFound({ status: 404, message: 'Estudante não encontrado' })
      }
      const updateStudant = await new UpdateStudentAction().execute(studant, studantData)
      return response.ok({
        status: 200,
        message: 'Estudante atualizado com sucesso',
        data: updateStudant,
      })
    } catch (error) {
      return response.badRequest({
        status: 404,
        message: 'Erro ao atualizar estudante',
        erro: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const studant = await new GetStudentByIdAction().execute(params.id)
    if (studant) {
      await new DeleteStudentAction().execute(studant)
      return response.ok({ status: 200, message: 'Estudante deletado com sucesso' })
    }
    return response.notFound({ status: 404, message: 'Estudante não encontrado' })
  }
}
