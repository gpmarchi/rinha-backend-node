import { Entity } from './entity'
import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface PersonProps {
  nickname: string
  name: string
  birthdate: Date
  techs: string[]
}

export class Person extends Entity<PersonProps> {
  get nickname() {
    return this.props.nickname
  }

  get name() {
    return this.props.name
  }

  get birthdate() {
    return this.props.birthdate
  }

  get techs() {
    return this.props.techs
  }

  static create(props: PersonProps, id?: UniqueEntityID) {
    const person = new Person(
      {
        ...props,
      },
      id,
    )

    return person
  }
}
