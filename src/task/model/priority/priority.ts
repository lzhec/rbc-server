import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Priority {
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
  @Column('integer')
  public weight: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  public archived: boolean;
}
