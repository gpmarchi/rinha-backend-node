import { Person } from '../entities/person'

export interface PersonsRepository {
  create(person: Person): Promise<void>
  findByNickname(nickname: string): Promise<number>
  findById(id: string): Promise<Person | null>
  findBySearchTerm(searchTerm: string): Promise<Person[]>
  countAll(): Promise<number>
}
