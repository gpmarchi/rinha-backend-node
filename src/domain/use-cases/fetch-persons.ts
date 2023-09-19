import { inject, injectable } from 'tsyringe'
import { Person } from '../entities/person'
import { PersonsRepository } from '../repositories/persons-repository'

interface FetchPersonsUseCaseRequest {
  searchTerm: string
}

interface FetchPersonsUseCaseResponse {
  persons: Person[]
}

@injectable()
export class FetchPersonsUseCase {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: PersonsRepository,
  ) {}

  async execute({
    searchTerm,
  }: FetchPersonsUseCaseRequest): Promise<FetchPersonsUseCaseResponse> {
    const persons = await this.personsRepository.findBySearchTerm(searchTerm)

    return {
      persons,
    }
  }
}
