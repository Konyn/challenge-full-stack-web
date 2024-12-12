import Studant from '#models/student'

export default class DeleteStudentAction {
  public async execute(studant: Studant) {
    return this.delete(studant)
  }
  private async delete(studant: Studant) {
    await studant.delete()
    return
  }
}
