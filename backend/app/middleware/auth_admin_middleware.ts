import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user
    if (user && !user.currentAccessToken.abilities.includes('admin')) {
      return ctx.response.status(403).send({
        error: 'Acesso negado.',
      })
    }
    await next()
  }
}
