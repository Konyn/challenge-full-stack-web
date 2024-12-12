import { test } from '@japa/runner'
import CreateCourseAction from '../../../app/actions/course/create_course.js'
import Sinon from 'sinon'
import Course from '#models/course'

test.group('CreateCourseAction.execute', (group) => {
  let createSub: sinon.SinonStub
  let course: Course
  let action: CreateCourseAction

  group.each.setup(() => {
    action = new CreateCourseAction()
    course = new Course()
    createSub = Sinon.stub(action, 'execute')
  })
  group.each.teardown(() => {
    createSub.restore()
  })
  test('Created a new course', async ({ assert }) => {
    const createResult = { name: 'Logica de programação', slug: 'logica' }
    createSub.resolves(createResult)
    const result = await action.execute(createResult)
    assert.deepEqual(result, createResult)
  })

  test('Return error message', async ({ assert }) => {
    const errorMessage = 'Error message'
    createSub.resolves(errorMessage)
    const result = await action.execute({ name: 'Logica de programação', slug: 'logica' })
    assert.equal(result, errorMessage)
  })

  test('Calls create when validateCourse returns falsy value', async ({ assert }) => {
    createSub.resolves(false)
    await action.execute({ name: 'Logica de programação', slug: 'logica' })
    assert.isTrue(createSub.calledOnce)
  })
})
