import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  public email: string;
}
