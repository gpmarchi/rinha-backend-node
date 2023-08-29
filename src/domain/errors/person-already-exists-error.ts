import { AppError } from './app-error'

export class PersonAlreadyExistsError extends AppError {
  constructor() {
    super('Person already exists.', 422)
  }
}
