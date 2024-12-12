import { test } from '@japa/runner'
import sinon from 'sinon'
import Student from '#models/student'
import DeleteStudentAction from '../../../app/actions/student/delete_student.js'

test.group('Student delete', (group) => {
  let deleteSub: sinon.SinonStub
  let student: Student
  let action: DeleteStudentAction

  group.each.setup(() => {
    student = new Student()
    student.id = 1
    student.name = 'John'
    student.email = 'john@test.com'
    student.ra = 1234567
    student.cpf = '00000000000'

    deleteSub = sinon.stub(student, 'delete').resolves()
    action = new DeleteStudentAction()
  })

  group.each.teardown(() => {
    deleteSub.restore()
  })
  test('Deletes the student successfully', async ({ assert }) => {
    await action.execute(student)
    assert.isTrue(deleteSub.calledOnce)
  })

  test('Handles error when delete fails', async ({ assert }) => {
    deleteSub.rejects(new Error('Delete failed'))
    await assert.rejects(() => action.execute(student), 'Delete failed')
    assert.isTrue(deleteSub.calledOnce)
  })
})
