import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../base-entity/base-entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private readonly _id: string;

  @Column('text', { name: 'value' })
  private _value: string;

  @ManyToMany(() => BaseEntity, (baseEntity) => baseEntity.tags)
  @JoinTable({
    name: 'tag_entity',
    joinColumns: [
      {
        name: 'tag_id',
        referencedColumnName: '_id',
        foreignKeyConstraintName: 'fk_tag_entity_tag_id',
      },
    ],
    inverseJoinColumns: [
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
  })
  private _entities: BaseEntity[];

  /**
   * Getters & Setters
   */

  public get id(): string {
    return this._id;
  }

  public set value(value) {
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }

  public set entities(value) {
    this._entities = value;
  }

  public get entities(): BaseEntity[] {
    return this._entities;
  }
}
