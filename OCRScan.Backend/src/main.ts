import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { LanguageService } from './language/language.service'
import { languages } from './language/data'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const languageService = app.get(LanguageService)
  const langCount = await languageService.getCount()
  if (langCount !== languages.length) {
    await languageService.insertData()
  }
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  await app.listen(process.env.PORT || 5000)
}
bootstrap()
