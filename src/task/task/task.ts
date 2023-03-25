import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskType } from '@task/model/service/task-type';
import { IntervalDate } from '@shared/util/interval-date';
import { Audit } from '@shared/util/audit';
import { Service } from '@task/model/service/service';
import { Priority } from '@task/model/priority/priority';
import { Status } from '@task/model/status/status';

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
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'parent_id' })
  public parent: Task;

  @ApiProperty()
  @OneToMany(() => Task, (task) => task.parent)
  public children: Task[];
}
