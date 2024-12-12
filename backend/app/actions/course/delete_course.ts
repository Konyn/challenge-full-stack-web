import Course from '#models/course'

export default class DeleteCourseAction {
  public async execute(id: number) {
    const course = await Course.findOrFail(id)
    if (course) {
      return course.delete()
    }
    return null
  }
}
