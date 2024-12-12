import { test } from '@japa/runner'
import GetCoursesAction from '../../../app/actions/course/get_courses.js'
import sinon from 'sinon'
import Course from '#models/course'

test.group('GetCoursesAction.execute', (group) => {
  let courses: sinon.SinonStub
  let action: GetCoursesAction

  group.each.setup(() => {
    courses = sinon.stub(Course, 'all')
    action = new GetCoursesAction()
  })
  group.each.teardown(() => {
    courses.restore()
  })
  test('Return all courses', async ({ assert }) => {
    const mockeCourses = [
      { id: 1, name: 'Logica de programação', slug: 'logica' },
      { id: 2, name: 'Docker', slug: 'docker' },
    ]
    courses.resolves(mockeCourses)
    const result = await action.execute()
    assert.deepEqual(result, mockeCourses)
    assert.isTrue(courses.calledOnce)
  })
})
