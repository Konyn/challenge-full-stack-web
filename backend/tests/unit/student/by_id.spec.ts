import { test } from '@japa/runner'
import sinon from 'sinon'
import GetStudentByIdAction from '../../../app/actions/student/get_student_by_id.js'
import Student from '#models/student'

test.group('Student by id', (group) => {
  let findOrFailStub: sinon.SinonStub
  let action: GetStudentByIdAction

  group.each.setup(() => {
    findOrFailStub = sinon.stub(Student, 'findOrFail')
    action = new GetStudentByIdAction()
  })
  group.each.teardown(() => {
    sinon.restore()
  })

  test('Return student by id', async ({ assert }) => {
    const mokeStudent = { id: 1, name: 'John', email: 'john@test.com' }
    findOrFailStub.resolves(mokeStudent)
    const result = await action.execute(mokeStudent.id)
    assert.deepEqual(result, mokeStudent)
    assert.isTrue(findOrFailStub.calledOnce)
  })

  test('Throws erro when student not found', async ({ assert }) => {
    findOrFailStub.rejects(new Error('E_ROW_NOT_FOUND: Row not found'))
    await assert.rejects(() => action.execute(999), 'E_ROW_NOT_FOUND: Row not found')
  })
})
