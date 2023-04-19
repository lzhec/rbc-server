import { Column } from 'typeorm';

export class Audit {
  @Column('timestamp', {
    name: 'created_at',
    nullable: false,
    default: new Date(),
  })
  public createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: false })
  public createdBy: string;

  @Column('varchar', { name: 'updated_at' })
  public updateAt: Date;

  @Column('uuid', { name: 'updated_by' })
  public updateBy: string;
}
