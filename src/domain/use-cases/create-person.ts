import { Person } from '../entities/person'
import { PersonAlreadyExistsError } from '../errors/person-already-exists-error'
import { PersonsRepository } from '../repositories/persons-repository'

interface CreatePersonUseCaseRequest {
  nickname: string
  name: string
  birthdate: string
  techs: string[] | null
}

interface CreatePersonUseCaseResponse {
  person: Person
}

export class CreatePersonUseCase {
  constructor(private personsRepository: PersonsRepository) {}

  async execute({
    nickname,
    name,
    birthdate,
    techs,
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const existingPerson = await this.personsRepository.findByNickname(nickname)

    if (existingPerson) {
      throw new PersonAlreadyExistsError()
    }

    const person = Person.create({
      nickname,
      name,
      birthdate: new Date(birthdate),
      techs: techs ?? [],
    })

    await this.personsRepository.create(person)

    return {
      person,
    }
  }
}
