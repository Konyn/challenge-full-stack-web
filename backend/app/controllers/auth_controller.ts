import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'
export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      const authToken = await User.accessTokens.create(user, ['admin'], { expiresIn: '1 day' })
      return response.ok({
        status: 200,
        data: { user, token: authToken.value?.release() },
      })
    } catch (error) {
      return response.badRequest({ status: 400, message: error.message })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken?.identifier
      if (!token) {
        return response.notFound({ status: 404, message: 'Token não encontrado' })
      }
      await User.accessTokens.delete(user, token)
      return response.ok({ status: 200, message: 'Deslogado com sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao deslogar', error: error.message })
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok({ status: 200, data: user })
    } catch (error) {
      return response.badRequest({ message: 'Erro ao obter usuário', erro: error.message })
    }
  }
}
