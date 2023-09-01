import { Person } from '../entities/person'

export interface PersonsRepository {
  create(person: Person): Promise<void>
  findByNickname(nickname: string): Promise<Person | null>
  findById(id: string): Promise<Person | null>
}
