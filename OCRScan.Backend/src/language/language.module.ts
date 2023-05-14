import { Module } from '@nestjs/common'
import { LanguageService } from './language.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Language } from './language.model'
import { LanguageController } from './language.controller';

@Module({
  imports: [SequelizeModule.forFeature([Language])],
  providers: [LanguageService],
  controllers: [LanguageController],
})
export class LanguageModule {}
