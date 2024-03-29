import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskType } from '@task/model/service/task-type';
import { Service } from '@task/model/service/service';
import { Priority } from '@task/model/priority/priority';
import { Status } from '@task/model/status/status';
import { TaskHistoryEvent } from '@task/model/task-history-event/task-history-event';
import { Group } from '@user/model/group/group';
import { User } from '@user/model/user/user';
import { IntervalDate } from '@shared/util/interval-date';
import { Audit } from '@shared/util/audit';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @ManyToOne(() => TaskType)
  @JoinColumn({ name: 'task_type_id' })
  public taskType: TaskType;

  @ApiProperty()
  @Column('varchar')
  public name: string;

  @ApiProperty()
  @Column('bigint')
  @Generated('increment')
  public number: number;

  @ApiProperty()
  @Column('text')
  public description: string;

  @ApiProperty()
  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  public service: Service;

  @ApiProperty()
  @ManyToOne(() => Priority)
  @JoinColumn({ name: 'priority_id' })
  public priority: Priority;

  @ApiProperty()
  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  public status: Status;

  @ApiProperty()
  @Column(() => Audit)
  public audit: Audit;

  @Column(() => IntervalDate)
  public planIntervalDate: IntervalDate;

  @Column(() => IntervalDate)
  public factIntervalDate: IntervalDate;

  @ApiProperty()
  @Column('bigint', { name: 'quantity_plan' })
  public quantityPlan: number;

  @ApiProperty()
  @Column('bigint', { name: 'quantity_fact' })
  public quantityFact: number;

  @ApiProperty()
  @Column('text', { name: 'additional_field' })
  public additionalField: string;

  @ApiProperty()
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'parent_id' })
  public parent: Task;

  @ApiProperty()
  @OneToMany(() => Task, (task) => task.parent)
  public children: Task[];

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'initiator_id' })
  public initiator: User;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'executor_id' })
  public executor: User;

  @ApiProperty()
  @ManyToOne(() => Group)
  @JoinColumn({ name: 'initiator_group_id' })
  public initiatorGroup: Group;

  @ApiProperty()
  @ManyToOne(() => Group)
  @JoinColumn({ name: 'executor_group_id' })
  public executorGroup: Group;

  @ApiProperty()
  @ManyToMany(() => User, (member) => member.tasks)
  @JoinTable({
    name: 'task_observer',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_task_observer_task_id',
    },
    inverseJoinColumn: {
      name: 'observer_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'ffk_task_observer_observer_id',
    },
  })
  public observers: User[];

  @ApiProperty()
  @ManyToMany(() => Group, (group) => group.tasks)
  @JoinTable({
    name: 'task_observer_group',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_task_observer_task_id',
    },
    inverseJoinColumn: {
      name: 'observer_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_task_observer_observer_id',
    },
  })
  public observerGroups: Group[];

  @ApiProperty()
  @OneToMany(() => TaskHistoryEvent, (history) => history.task, {
    cascade: true,
  })
  public history: TaskHistoryEvent[];

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;

  public static fromObject(obj: Task): Task {
    const task = new Task();

    Object.assign(task, obj);

    return task;
  }
}
