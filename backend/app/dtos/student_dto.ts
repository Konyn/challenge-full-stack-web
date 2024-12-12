export default class StudentDto {
  constructor(
    public name: string,
    public email: string,
    public ra?: number,
    public cpf?: string
  ) {}
}
