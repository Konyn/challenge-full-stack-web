import Student from '#models/student'

export default class GetStudentsAction {
  public async execute() {
    return this.get()
  }
  private async get() {
    return await Student.all()
  }
  private async paginete(page: number = 1, perPage: number = 2) {
    const student = await Student.query().paginate(page, perPage)
    const data = {
      students: student.all(),
      meta: {
        currentPage: student.currentPage,
        perPage: student.perPage,
        lastPage: student.lastPage,
        total: student.total,
      },
    }

    return data
  }
  private async sort(field: string, order: 'asc' | 'desc') {
    return await Student.query().orderBy(field, order)
  }
}
