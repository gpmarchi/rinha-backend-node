import { Person } from '@/domain/entities/person'
import { PersonsRepository } from '@/domain/repositories/persons-repository'

export class InMemoryPersonsRepository implements PersonsRepository {
  public items: Person[] = []

  async create(person: Person): Promise<void> {
    this.items.push(person)
  }

  async findByNickname(nickname: string): Promise<Person | null> {
    const person = this.items.find(
      (person) => person.nickname.toLowerCase() === nickname.toLowerCase(),
    )

    if (!person) {
      return null
    }

    return person
  }

  async findById(id: string): Promise<Person | null> {
    const person = this.items.find((person) => person.id.toString() === id)

    if (!person) {
      return null
    }

    return person
  }

  async findBySearchTerm(searchTerm: string): Promise<Person[]> {
    const persons = this.items.filter(
      (person) =>
        person.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.techs.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    )

    return persons
  }

  async countAll(): Promise<number> {
    return this.items.length
  }
}
