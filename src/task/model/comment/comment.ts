import { Column } from 'typeorm';

export class Comment {
  @Column('text')
  public content: string;

  @Column('timestamptz', { name: 'updated_at' })
  public updateDate: Date;

  @Column('boolean', { name: 'is_private' })
  public isPrivate: boolean;
}
