import { test } from '@japa/runner'
import sinon from 'sinon'
import User from '#models/user'
import AuthController from '#controllers/auth_controller'

test.group('AuthController', (group) => {
  let requestMock: any
  let responseMock: any
  let authMock: any
  let authController: AuthController

  group.each.setup(() => {
    requestMock = {
      validateUsing: sinon.stub(),
    }

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

  test('login returns user and token on successful login', async ({ assert }) => {
    const mockUser = { id: 1, email: 'test@example.com' }
    const mockToken = { value: { release: () => 'mock_token' } }

    requestMock.validateUsing.resolves({ email: 'test@example.com', password: 'password123' })
    sinon.stub(User, 'verifyCredentials').resolves(mockUser)
    sinon.stub(User.accessTokens, 'create').resolves(mockToken)

    await authController.login({ request: requestMock, response: responseMock })

    assert.isTrue(responseMock.ok.calledOnce)
    assert.deepEqual(responseMock.ok.firstCall.args[0], {
      status: 200,
      data: { user: mockUser, token: 'mock_token' },
    })
  })

  test('login returns error when credentials are invalid', async ({ assert }) => {
    requestMock.validateUsing.resolves({ email: 'invalid@example.com', password: 'wrongpassword' })
    sinon.stub(User, 'verifyCredentials').rejects(new Error('Invalid credentials'))

    await authController.login({ request: requestMock, response: responseMock })

    assert.isTrue(responseMock.badRequest.calledOnce)
    assert.deepEqual(responseMock.badRequest.firstCall.args[0], {
      message: 'Invalid credentials',
    })
  })
})
