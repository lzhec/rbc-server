import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '@task/task/task';
import { User } from '@user/model/user/user';
import { Comment } from '@task/model/comment/comment';

@Entity()
export class TaskHistoryEvent {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Task)
  public task: Task;

  @ManyToOne(() => User)
  public author: User;

  @Column('timestamp with time zone', {
    name: 'event_date',
    nullable: false,
    default: new Date(),
  })
  public eventDate: Date;

  @Column('text')
  public events: string;

  @ApiProperty()
  @Column(() => Comment)
  public comment: Comment;
}
