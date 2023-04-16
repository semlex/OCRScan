import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserDto } from './dto/get-user.dto'
import { User } from './user.model'
import { MapInterceptor } from '@automapper/nestjs'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signUp')
  @UseInterceptors(MapInterceptor(User, UserDto))
  signUp(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }
  @Get('/:id')
  @UseInterceptors(MapInterceptor(User, UserDto))
  getUser(@Param('id') id) {
    return this.usersService.getUser(id)
  }
}
