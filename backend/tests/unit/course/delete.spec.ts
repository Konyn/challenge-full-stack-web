import { test } from '@japa/runner'
import sinon from 'sinon'
import DeleteCourseAction from '../../../app/actions/course/delete_course.js'
import Course from '#models/course'

test.group('Course delete', (group) => {
  let deleteSub: sinon.SinonStub
  let findOrFailStub: sinon.SinonStub
  let course: Course
  let action: DeleteCourseAction

  group.each.setup(() => {
    course = new Course()
    course.id = 1
    course.name = 'Logica de programação'
    course.slug = 'logica'
    action = new DeleteCourseAction()
    deleteSub = sinon.stub(course, 'delete').resolves()
    findOrFailStub = sinon.stub(Course, 'findOrFail').resolves(course)
  })
  group.each.teardown(() => {
    deleteSub.restore()
  })
  test('example test', async ({ assert }) => {
    await action.execute(course.id)
    assert.isTrue(deleteSub.calledOnce)
  })
})
