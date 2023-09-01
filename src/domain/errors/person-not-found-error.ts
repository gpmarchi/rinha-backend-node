import { AppError } from './app-error'

export class PersonNotFoundError extends AppError {
  constructor() {
    super('Person not found.', 404)
  }
}
