import { Person } from '../entities/person'
import { PersonsRepository } from '../repositories/persons-repository'

interface FetchPersonsUseCaseRequest {
  searchTerm: string
}

interface FetchPersonsUseCaseResponse {
  persons: Person[]
}

export class FetchPersonsUseCase {
  constructor(private personsRepository: PersonsRepository) {}

  async execute({
    searchTerm,
  }: FetchPersonsUseCaseRequest): Promise<FetchPersonsUseCaseResponse> {
    const persons = await this.personsRepository.findBySearchTerm(searchTerm)

    return {
      persons,
    }
  }
}
