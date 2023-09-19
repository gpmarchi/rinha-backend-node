import { inject, injectable } from 'tsyringe'
import { PersonsRepository } from '../repositories/persons-repository'

interface CountPersonsUseCaseResponse {
  count: number
}

@injectable()
export class CountPersonsUseCase {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: PersonsRepository,
  ) {}

  async execute(): Promise<CountPersonsUseCaseResponse> {
    const count = await this.personsRepository.countAll()

    return {
      count,
    }
  }
}
