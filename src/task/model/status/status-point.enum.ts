export enum StatusPointEnum {
  NEW,
  IN_WORK,
  CLOSED,
  REJECTED,
  ACCEPTED,
}

export class StatusPoint {
  public id: StatusPointEnum;
  public name: keyof typeof StatusPointEnum;

  constructor(id: StatusPointEnum, name: keyof typeof StatusPointEnum) {
    this.id = id;
    this.name = name;
  }

  public static NEW = new StatusPoint(StatusPointEnum.NEW, 'NEW');
  public static IN_WORK = new StatusPoint(StatusPointEnum.IN_WORK, 'IN_WORK');
  public static CLOSED = new StatusPoint(StatusPointEnum.CLOSED, 'CLOSED');
  public static REJECTED = new StatusPoint(
    StatusPointEnum.REJECTED,
    'REJECTED',
  );
  public static ACCEPTED = new StatusPoint(
    StatusPointEnum.ACCEPTED,
    'ACCEPTED',
  );
}
