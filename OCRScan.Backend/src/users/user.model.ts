import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { Exclude } from 'class-transformer'
import { AutoMap } from '@automapper/classes'

interface IUserCreationCreationAttrs {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationCreationAttrs> {
  @Exclude()
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @AutoMap()
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Exclude()
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Exclude()
  refreshToken?: string
}
