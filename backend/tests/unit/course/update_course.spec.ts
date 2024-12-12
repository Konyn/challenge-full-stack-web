import { test } from '@japa/runner'
import UpdateCourseAction from '../../../app/actions/course/update_course.js'
import sinon from 'sinon'
import Course from '#models/course'

test.group('UpdateCourseAction.execute', (group) => {
  let updateSub: sinon.SinonStub
  let course: Course
  let findOrFailStub: sinon.SinonStub
  let action: UpdateCourseAction

  group.each.setup(() => {
    action = new UpdateCourseAction()
    course = new Course()
    course.id = 1
    course.name = 'Logica de programação'
    course.slug = 'logica'
    updateSub = sinon.stub(course, 'save').resolves(course)
    findOrFailStub = sinon.stub(Course, 'findOrFail').resolves(course)
  })

  group.each.teardown(() => {
    updateSub.restore()
  })
  test('example test', async ({ assert }) => {
    const updateResult = { name: 'Logica de programação 2', slug: 'logica' }
    const result = await action.execute(course.id, updateResult)
    assert.equal(result.name, updateResult.name)
    assert.equal(result.slug, updateResult.slug)
    assert.isTrue(updateSub.calledOnce)
  })
})
