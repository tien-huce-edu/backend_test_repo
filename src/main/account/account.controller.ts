/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Param,
  Post,
  Res,
  UseGuards,
  Controller,
  Get,
  Logger,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { PasswordChangeDTO } from '../user/password-change.dto';
// import { UserDTO } from '../../main/user/user.dto';
// import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { UserDTO } from '../user/user.dto';

@Controller('api')
// @UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiTags('account-resource')
export class AccountController {
  logger = new Logger('AccountController');

  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'Registered user',
    type: UserDTO,
  })
  async registerAccount(
    @Req() req: Request,
    @Body() userDTO: UserDTO & { password: string },
  ): Promise<any> {
    return await this.authService.registerNewUser(userDTO);
  }

  @Get('/activate')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Activate an account' })
  @ApiResponse({
    status: 200,
    description: 'activated',
  })
  activateAccount(@Param() key: string, @Res() res: Response): any {
    throw new InternalServerErrorException();
  }

  @Get('/authenticate')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated',
  })
  isAuthenticated(@Req() req: any): any {
    return req.user.login;
  }

  @Get('/account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get the current user.' })
  @ApiResponse({
    status: 200,
    description: 'user retrieved',
  })
  async getAccount(@Req() req: any): Promise<any> {
    const userProfileFound = await this.authService.getAccount(req.user.id);
    return userProfileFound;
  }

  @Post('/account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update the current user information' })
  @ApiResponse({
    status: 201,
    description: 'user info updated',
    type: UserDTO,
  })
  async saveAccount(
    @Req() req: any,
    @Body() newUserInfo: UserDTO,
  ): Promise<any> {
    return await this.authService.updateUserSettings(
      req.user.login,
      newUserInfo,
    );
  }

  @Post('/account/change-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Change current password' })
  @ApiResponse({
    status: 201,
    description: 'user password changed',
    type: PasswordChangeDTO,
  })
  async changePassword(
    @Req() req: any,
    @Body() passwordChange: PasswordChangeDTO,
  ): Promise<any> {
    return await this.authService.changePassword(
      req.user.login,
      passwordChange.currentPassword,
      passwordChange.newPassword,
    );
  }

  @Post('/account/reset-password/init')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Send an email to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'mail to reset password sent',
    type: 'string',
  })
  requestPasswordReset(
    @Req() req: Request,
    @Body() email: string,
    @Res() res: Response,
  ): any {
    throw new InternalServerErrorException();
  }

  @Post('/account/reset-password/finish')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Finish to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'password reset',
    type: 'string',
  })
  finishPasswordReset(
    @Req() req: Request,
    @Body() keyAndPassword: string,
    @Res() res: Response,
  ): any {
    throw new InternalServerErrorException();
  }
}