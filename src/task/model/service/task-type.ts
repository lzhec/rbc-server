import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Service } from '@task/model/service/service';

@Entity()
export class TaskType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @Column('varchar', { nullable: false })
  public name: string;

  @ApiProperty()
  @Column('text')
  public description: string;

  @ManyToMany(() => Service, (service) => service.taskTypes)
  @JoinTable({
    name: 'service_task_type',
    joinColumn: {
      name: 'task_type_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_task_type_task_type_id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_task_type_service_id',
    },
  })
  public services: Service[];

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;
}
