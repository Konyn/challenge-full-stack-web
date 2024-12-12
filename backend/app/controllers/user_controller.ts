import { HttpContext } from '@adonisjs/core/http'
import CreateUserAction from '../actions/user/create_user.js'
import { userValidator } from '#validators/user'

export default class UserController {
  public async register({ request, response }: HttpContext) {
    const userValidated = await request.validateUsing(userValidator)
    try {
      const user = await new CreateUserAction().execute(userValidated)
      return response.created({ status: 201, message: 'Usuário criado com sucesso', data: user })
    } catch (error) {
      return response.badRequest({
        status: 400,
        message: 'Não foi possivel cadastrar o usuário',
        error: error.message,
      })
    }
  }
}
