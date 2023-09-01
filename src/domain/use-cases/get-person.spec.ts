import { InMemoryPersonsRepository } from 'test/repositories/in-memory-persons-repository'
import { Person } from '../entities/person'
import { PersonNotFoundError } from '../errors/person-not-found-error'
import { GetPersonUseCase } from './get-person'

let inMemoryPersonsRepository: InMemoryPersonsRepository
let sut: GetPersonUseCase

describe('Get Person', () => {
  beforeEach(() => {
    inMemoryPersonsRepository = new InMemoryPersonsRepository()

    sut = new GetPersonUseCase(inMemoryPersonsRepository)
  })

  it('should be able to get a person', async () => {
    const newPerson = Person.create({
      nickname: 'johndoe',
      name: 'John Doe',
      birthdate: new Date('1970-01-01'),
      techs: ['NodeJS', 'PostgreSQL'],
    })

    await inMemoryPersonsRepository.create(newPerson)

    const { person } = await sut.execute({ id: newPerson.id.toString() })

    expect(person).toEqual(newPerson)
  })

  it('should not be able to get an nonexistent person', async () => {
    await expect(
      sut.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(PersonNotFoundError)
  })
})
