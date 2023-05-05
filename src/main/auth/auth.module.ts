import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../security/passport.jwt.strategy';
import { config } from '../../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from '../account/account.controller';
import { RocketPersonnelRole } from '../../entities/RocketPersonnelRole';
import { UserJWTController } from '../user.jwt.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RocketPersonnelRole]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config['security.jwt.base64-secret'],
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserJWTController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
