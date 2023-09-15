import { InMemoryPersonsRepository } from 'test/repositories/in-memory-persons-repository'
import { Person } from '../entities/person'
import { FetchPersonsUseCase } from './fetch-persons'

let inMemoryPersonsRepository: InMemoryPersonsRepository
let sut: FetchPersonsUseCase

describe('Fetch Persons', () => {
  beforeEach(() => {
    inMemoryPersonsRepository = new InMemoryPersonsRepository()

    sut = new FetchPersonsUseCase(inMemoryPersonsRepository)
  })

  it('should be able to fetch persons', async () => {
    const newPerson = Person.create({
      nickname: 'johndoe',
      name: 'John Doe',
      birthdate: new Date('1970-01-01'),
      techs: 'NodeJS, PostgreSQL',
    })

    await inMemoryPersonsRepository.create(newPerson)

    const { persons } = await sut.execute({ searchTerm: 'node' })

    expect(persons).toEqual([newPerson])
  })
})
