import { test } from '@japa/runner'
import CreateUserAction from '../../../app/actions/user/create_user.js'
import sinon from 'sinon'

test.group('CreateUserAction.register', (group) => {
  let createUser: sinon.SinonStub
  let action: CreateUserAction

  group.each.setup(() => {
    action = new CreateUserAction()
    createUser = sinon.stub(action, 'execute')
  })
  group.each.teardown(() => {
    createUser.restore()
  })
  test('Create a new user', async ({ assert }) => {
    const mockUserData = {
      name: 'John',
      email: 'john@test.com',
      password: 'password',
    }
    const createResult = { id: 1, name: 'John', email: 'john@test.com' }
    createUser.resolves(createResult)
    const result = await action.execute(mockUserData)
    assert.deepEqual(result, createResult)
    assert.isTrue(createUser.calledOnce)
    assert.isTrue(createUser.calledWith(mockUserData))
  })
})
