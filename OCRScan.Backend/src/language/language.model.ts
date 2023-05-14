import { Table, Column, Model, DataType } from 'sequelize-typescript'
interface ILanguageCreationAttrs {
  name: string
  code: string
}

@Table({ tableName: 'languages' })
export class Language extends Model<Language, ILanguageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
  })
  name: string

  @Column({
    type: DataType.STRING,
  })
  code: string
}
