import { test } from '@japa/runner'
import sinon from 'sinon'
import StudantDto from '../../../app/dtos/student_dto.js'
import UpdateStudentAction from '../../../app/actions/student/update_student.js'
import Student from '#models/student'

test.group('UpdateStudentAction.execute', (group) => {
  let saveStub: sinon.SinonStub
  let student: Student
  let action: UpdateStudentAction

  group.each.setup(() => {
    student = new Student()
    student.name = 'Arian'
    student.email = 'arian@teste.com'
    student.cpf = '00000000000'
    saveStub = sinon.stub(student, 'save').resolves(student)
    action = new UpdateStudentAction()
  })
  group.each.teardown(() => {
    sinon.restore()
  })

  test('update student data correctly', async ({ assert }) => {
    const updateData: StudantDto = {
      name: 'Arian J.',
      email: 'arian.j@teste.com',
      cpf: '11111111111',
      ra: 1234567,
    }
    const result = await action.execute(student, updateData)

    assert.equal(result.name, updateData.name)
    assert.equal(result.email, updateData.email)
    assert.isTrue(saveStub.calledOnce)
  })
})
