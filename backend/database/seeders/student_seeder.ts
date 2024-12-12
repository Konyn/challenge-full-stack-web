import Student from '#models/student'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()
    const student = new Student()
    try {
      student.useTransaction(trx)
      await Student.createMany([
        {
          name: 'João',
          email: 'joao124@teste.com',
          ra: 1224767,
          cpf: '12345671901',
        },
        {
          name: 'Maria',
          email: 'maria@teste.com',
          ra: 2345673,
          cpf: '23456789012',
        },
        {
          name: 'Pedro',
          email: 'pedro@teste.com',
          ra: 3456786,
          cpf: '34567890123',
        },
        {
          name: 'Ana',
          email: 'ana@teste.com',
          ra: 4567893,
          cpf: '45678901234',
        },
        {
          name: 'Lucas',
          email: 'lucas@teste.com',
          ra: 5678907,
          cpf: '56789012345',
        },
        {
          name: 'Mariana',
          email: 'mariana@teste.com',
          ra: 6789013,
          cpf: '67890123456',
        },
        {
          name: 'Rafael',
          email: 'rafael@teste.com',
          ra: 7890124,
          cpf: '78901234567',
        },
        {
          name: 'Isabella',
          email: 'isabella@teste.com',
          ra: 8901235,
          cpf: '89012345678',
        },
        {
          name: 'Guilherme',
          email: 'guilherme@teste.com',
          ra: 9012345,
          cpf: '90123456789',
        },
        {
          name: 'Fernanda',
          email: 'fernanda@teste.com',
          ra: 9523456,
          cpf: '01234567890',
        },
      ])
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
