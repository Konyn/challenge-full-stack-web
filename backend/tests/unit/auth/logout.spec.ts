import { test } from '@japa/runner'
import AuthController from '#controllers/auth_controller'
import sinon from 'sinon'
import User from '#models/user'

test.group('AuthController.logout', (group) => {
  let responseMock: any
  let authMock: any
  let authController: AuthController

  group.each.setup(() => {
    responseMock = {
      ok: sinon.stub(),
      badRequest: sinon.stub(),
    }

    authMock = {
      getUserOrFail: sinon.stub(),
      user: {
        currentAccessToken: { identifier: 'token123' },
      },
    }
    authController = new AuthController()
  })
  group.each.teardown(() => {
    sinon.restore()
  })
  test('Logout user succesfully', async ({ assert }) => {
    const mockUser = { id: 1, email: 'user@test.com' }
    authMock.getUserOrFail.resolves(mockUser)
    sinon.stub(User.accessTokens, 'delete').resolves()
    await authController.logout({ auth: authMock, response: responseMock } as any)
    assert.isTrue(User.accessTokens.delete.calledOnce)
    assert.isTrue(responseMock.ok.calledOnce)
    assert.deepEqual(responseMock.ok.firstCall.args[0], { message: 'Deslogado com sucesso' })
  })

  test('Should return error if token not found', async ({ assert }) => {
    authMock.getUserOrFail.resolves({ id: 1, email: 'test@test.com' })
    authMock.user.currentAccessToken = null
    await authController.logout({ auth: authMock, response: responseMock } as any)
    assert.isTrue(responseMock.badRequest.calledOnce)
    assert.deepEqual(responseMock.badRequest.firstCall.args[0], { message: 'Token não encontrado' })
  })

  test('Should return error if user not fould', async ({ assert }) => {
    authMock.getUserOrFail.throws(new Error('User not found'))
    await authController.logout({ auth: authMock, response: responseMock } as any)
    assert.isTrue(responseMock.badRequest.calledOnce)
    assert.deepEqual(responseMock.badRequest.firstCall.args[0], {
      message: 'Erro ao deslogar',
      error: 'User not found',
    })
  })
})
