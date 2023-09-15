import { InMemoryPersonsRepository } from 'test/repositories/in-memory-persons-repository'
import { Person } from '../entities/person'
import { PersonAlreadyExistsError } from '../errors/person-already-exists-error'
import { CreatePersonUseCase } from './create-person'

let inMemoryPersonsRepository: InMemoryPersonsRepository
let sut: CreatePersonUseCase

describe('Create Person', () => {
  beforeEach(() => {
    inMemoryPersonsRepository = new InMemoryPersonsRepository()

    sut = new CreatePersonUseCase(inMemoryPersonsRepository)
  })

  it('should be able to create a person without techs', async () => {
    const { person } = await sut.execute({
      nickname: 'johndoe',
      name: 'John Doe',
      birthdate: new Date('1970-01-01'),
      techs: null,
    })

    expect(inMemoryPersonsRepository.items[0].id.toString()).toEqual(
      person.id.toString(),
    )
    expect(person.nickname).toEqual('johndoe')
    expect(person.name).toEqual('John Doe')
    expect(person.birthdate).toEqual(new Date('1970-01-01'))
    expect(person.techs).toEqual(null)
  })

  it('should be able to create a person with techs', async () => {
    const { person } = await sut.execute({
      nickname: 'johndoe',
      name: 'John Doe',
      birthdate: new Date('1970-01-01'),
      techs: 'NodeJS, Postgres',
    })

    expect(inMemoryPersonsRepository.items[0].id.toString()).toEqual(
      person.id.toString(),
    )
    expect(person.nickname).toEqual('johndoe')
    expect(person.name).toEqual('John Doe')
    expect(person.birthdate).toEqual(new Date('1970-01-01'))
    expect(person.techs).toEqual(expect.stringContaining('NodeJS, Postgres'))
  })

  it('should not be able to create a person that already exists', async () => {
    const person = Person.create({
      nickname: 'johndoe',
      name: 'John Doe',
      birthdate: new Date('1970-01-01'),
      techs: null,
    })

    await inMemoryPersonsRepository.create(person)

    await expect(
      sut.execute({
        nickname: 'johndoe',
        name: 'John Doe',
        birthdate: new Date('1970-01-01'),
        techs: null,
      }),
    ).rejects.toBeInstanceOf(PersonAlreadyExistsError)
  })
})
