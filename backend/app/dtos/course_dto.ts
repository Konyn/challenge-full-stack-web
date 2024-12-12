// import { Expose } from 'class-transformer'

export default class CourseDto {
  constructor(
    public name: string,
    public slug: string,
    public image?: string,
    public description?: string,
    public id?: number
  ) {}
}
