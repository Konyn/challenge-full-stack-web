import Course from '#models/course'

export default class GetCoursesAction {
  public async execute() {
    const courses = await Course.all()
    return courses
  }
}
