import Studant from '#models/student'

export default class GetStudentByIdAction {
  public async execute(strudantId: number) {
    return this.get(strudantId)
  }
  private async get(strudantId: number) {
    const studant = await Studant.findOrFail(strudantId)
    return studant
  }
}
