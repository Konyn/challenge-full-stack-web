import { test } from '@japa/runner'
import sinon from 'sinon'
import StudantDto from '../../../app/dtos/student_dto.js'
import CreateStudentAction from '../../../app/actions/student/create_student.js'

test.group('CreateStudentAction.execute', (group) => {
  let createStub: sinon.SinonStub
  let action: CreateStudentAction

  group.each.setup(() => {
    action = new CreateStudentAction()
    createStub = sinon.stub(action, 'execute')
  })

  group.each.teardown(() => {
    sinon.restore()
  })

  test('returns error message when validateStudant returns truthy value', async ({ assert }) => {
    const errorMessage = 'Error message'
    createStub.resolves(errorMessage)
    const result = await action.execute(new StudantDto())
    assert.equal(result, errorMessage)
  })

  test('calls create when validateStudant returns falsy value', async ({ assert }) => {
    createStub.resolves(false)
    await action.execute(new StudantDto())
    assert.isTrue(createStub.calledOnce)
  })

  test('returns result of create when validateStudant returns falsy value', async ({ assert }) => {
    const createResult = { id: 1, name: 'John Doe' }
    createStub.resolves(createResult)
    const result = await action.execute(new StudantDto())
    assert.deepEqual(result, createResult)
  })
})
