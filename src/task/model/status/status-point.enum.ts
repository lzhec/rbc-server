import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum StatusPointEnum {
  NEW,
  IN_WORK,
  CLOSED,
  REJECTED,
  ACCEPTED,
}

export class StatusPoint {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  public name: string;

  public static NEW = StatusPointEnum.NEW;
  public static IN_WORK = StatusPointEnum.IN_WORK;
  public static CLOSED = StatusPointEnum.CLOSED;
  public static REJECTED = StatusPointEnum.REJECTED;
  public static ACCEPTED = StatusPointEnum.ACCEPTED;
}
