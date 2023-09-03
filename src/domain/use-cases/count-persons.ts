import { PersonsRepository } from '../repositories/persons-repository'

interface CountPersonsUseCaseResponse {
  count: number
}

export class CountPersonsUseCase {
  constructor(private personsRepository: PersonsRepository) {}

  async execute(): Promise<CountPersonsUseCaseResponse> {
    const count = await this.personsRepository.countAll()

    return {
      count,
    }
  }
}
