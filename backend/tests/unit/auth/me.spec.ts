import { test } from '@japa/runner'
import sinon from 'sinon'
import AuthController from '#controllers/auth_controller'

test.group('AuthController - me', (group) => {
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
    }
    authController = new AuthController()
  })

  group.each.teardown(() => {
    sinon.restore()
  })

  test('should return current user data', async ({ assert }) => {
    const mockUser = { id: 1, email: 'test@example.com' }
    authMock.getUserOrFail.returns(mockUser)
    await authController.me({ auth: authMock, response: responseMock } as any)
    assert.isTrue(responseMock.ok.calledOnce)
    assert.deepEqual(responseMock.ok.firstCall.args[0], { data: mockUser })
  })

  test('should return error if user not found', async ({ assert }) => {
    authMock.getUserOrFail.throws(new Error('User not found'))
    await authController.me({ auth: authMock, response: responseMock } as any)
    assert.isTrue(responseMock.badRequest.calledOnce)
    assert.deepEqual(responseMock.badRequest.firstCall.args[0], {
      message: 'Erro ao obter usuário',
      erro: 'User not found',
    })
  })
})
