import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './typeorm/orm.config';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
