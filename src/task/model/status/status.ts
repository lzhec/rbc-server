import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StatusPoint } from '@task/model/status/status-point.enum';

@Entity()
export class Status {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @Column('varchar', { nullable: false })
  public name: string;

  @ApiProperty()
  @Column('varchar')
  public color: string;

  @ApiProperty()
  @Column('integer', { nullable: false, default: 0 })
  public weight: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;

  @ApiProperty()
  @Column('jsonb', { name: 'status_point' })
  public statusPoint: StatusPoint;

  public static fromObject(obj: Status): Status {
    const status = new Status();

    return Object.assign(status, obj);
  }
}
