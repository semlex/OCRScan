import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Language } from './language.model'
import { languages } from './data'

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language) private languageRepository: typeof Language,
  ) {}

  async getAll() {
    return await this.languageRepository.findAll({
      order: [['name', 'ASC']],
    })
  }

  async getCount() {
    return await this.languageRepository.count()
  }

  async insertData() {
    await this.languageRepository.bulkCreate(languages)
  }
}
