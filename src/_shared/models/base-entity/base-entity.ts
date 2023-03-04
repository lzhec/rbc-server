import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tag } from '../tag/tag';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private readonly _id: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'tag_entity',
    joinColumns: [
      {
        name: 'entity_id',
        referencedColumnName: '_id',
        foreignKeyConstraintName: 'fk_tag_entity_entity_id',
      },
      {
        name: 'entity_class',
        referencedColumnName: 'type',
        foreignKeyConstraintName: 'fk_tag_entity_entity_class',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'tag_id',
        referencedColumnName: '_id',
        foreignKeyConstraintName: 'fk_tag_entity_tag_id',
      },
    ],
  })
  private _tags: Tag[];

  /**
   * Getters & Setters
   */

  public get id(): string {
    return this._id;
  }

  public set tags(value) {
    this._tags = value;
  }

  public get tags(): Tag[] {
    return this._tags;
  }

  constructor(id: string) {
    this._id = id;
  }
}
