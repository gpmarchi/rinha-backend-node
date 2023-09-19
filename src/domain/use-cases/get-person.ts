import { inject, injectable } from 'tsyringe'
import { Person } from '../entities/person'
import { PersonNotFoundError } from '../errors/person-not-found-error'
import { PersonsRepository } from '../repositories/persons-repository'

interface GetPersonUseCaseRequest {
  id: string
}

interface GetPersonUseCaseResponse {
  person: Person
}

@injectable()
export class GetPersonUseCase {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: PersonsRepository,
  ) {}

  async execute({
    id,
  }: GetPersonUseCaseRequest): Promise<GetPersonUseCaseResponse> {
    const person = await this.personsRepository.findById(id)

    if (!person) {
      throw new PersonNotFoundError()
    }

    return {
      person,
    }
  }
}
