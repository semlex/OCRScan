import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getUser(userId: string) {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async validateRefreshToken(id: string, refreshToken: string) {
    return this.userRepository.findOne({
      where: {
        id,
        refreshToken,
      },
    });
  }
}
