import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Group } from '@user/model/group/group';
import { TaskType } from '@task/model/service/task-type';

@Entity()
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @Column('varchar', { nullable: false })
  public name: string;

  @ApiProperty()
  @Column('text')
  public description: string;

  @ApiProperty()
  @Column('integer', { nullable: false })
  public weight: number;

  @ApiProperty({ name: 'inherit_bind' })
  @Column('boolean', { name: 'task_type_binding_inherit' })
  public taskTypeBindingInherit: boolean;

  @ApiProperty()
  @Column('varchar')
  public path: string;

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;

  @ApiProperty()
  @ManyToOne(() => Service, (service) => service.children)
  @JoinColumn({ name: 'parent_id' })
  public parent: Service;

  @ApiProperty()
  @OneToMany(() => Service, (service) => service.parent)
  public children: Service[];

  @ManyToMany(() => Group, (group) => group.services)
  @JoinTable({
    name: 'service_user_group',
    joinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_group_service_id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_group_group_id',
    },
  })
  public groups: Group[];

  @ManyToMany(() => TaskType, (taskType) => taskType.services)
  @JoinTable({
    name: 'service_task_type',
    joinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_task_type_service_id',
    },
    inverseJoinColumn: {
      name: 'task_type_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_service_task_type_task_type_id',
    },
  })
  public taskTypes: TaskType[];
}
