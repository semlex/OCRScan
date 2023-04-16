import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './user.model'
import { UserProfile } from './user.profile'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserProfile],
})
export class UsersModule {}
