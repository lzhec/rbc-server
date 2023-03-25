import { Column } from 'typeorm';

enum Volume {
  HOUR = 'HOUR',
  DAY = 'DAY',
}

export class IntervalDate {
  @Column('date', { name: 'start_date' })
  public startDate: Date;

  @Column('date', { name: 'end_date' })
  public endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
