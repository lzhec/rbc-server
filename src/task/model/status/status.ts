import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StatusPointEnum } from '@task/model/status/status-point.enum';

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
  @Column('integer', { default: 0 })
  public weight: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;

  @ApiProperty()
  @Column('text', { name: 'status_point' })
  public statusPoint: StatusPointEnum;

  public static fromObject(obj: Status): Status {
    const status = new Status();

    return Object.assign(status, obj);
  }
}
