import { test } from '@japa/runner'
import Student from '#models/student'
import GetStudentsAction from '../../../app/actions/student/get_students.js'
import sinon from 'sinon'

test.group('GetStudentsAction.get', (group) => {
  let allSub: sinon.SinonStub
  let action: GetStudentsAction

  group.each.setup(() => {
    allSub = sinon.stub(Student, 'all')
    action = new GetStudentsAction()
  })
  group.each.teardown(() => {
    sinon.restore()
  })
  test('Return all students', async ({ assert }) => {
    const mokeStudants = [
      { id: 1, name: 'John Doe', email: 'john@test.com' },
      { id: 2, name: 'mari Doe', email: 'mari@test.com' },
    ]
    allSub.resolves(mokeStudants)
    const result = await action.execute()
    assert.deepEqual(result, mokeStudants)
    assert.isTrue(allSub.calledOnce)
  })
})
