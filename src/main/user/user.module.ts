import { Module } from '@nestjs/common';
import { ManagementController } from './management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { RocketPersonnelAccount } from '../../entities/RocketPersonnelAccount';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RocketPersonnelAccount])],
  controllers: [UserController, ManagementController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
