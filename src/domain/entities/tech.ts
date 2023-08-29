import { Entity } from './entity'
import { UniqueEntityID } from './value-objects/unique-entity-id'

export interface TechProps {
  personId: string
  name: string
}

export class Tech extends Entity<TechProps> {
  get personId() {
    return this.props.personId
  }

  get name() {
    return this.props.name
  }

  static create(props: TechProps, id?: UniqueEntityID) {
    const tech = new Tech(
      {
        ...props,
      },
      id,
    )

    return tech
  }
}
