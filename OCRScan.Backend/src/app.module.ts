import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.model';
import { AutomapperModule } from '@automapper/nestjs';
import { sequelize } from '@automapper/sequelize';
import { OcrModule } from './ocr/ocr.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: sequelize(),
    }),
    UsersModule,
    AuthModule,
    OcrModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
