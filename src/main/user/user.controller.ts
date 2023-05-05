import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../entities/base/pagination.entity';
import { HeaderUtil } from '../../common/header-util';
import { Request } from '../../common/request';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
// import { Roles } from '../../../security/decorators/roles.decorator';

@Controller('api/admin/users')
@UseGuards(AuthGuard, RolesGuard)
// @UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('user-resource')
export class UserController {
  logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get the list of users' })
  @ApiResponse({
    status: 200,
    description: 'List all users',
    type: UserDTO,
  })
  async getAllUsers(@Req() req: Request): Promise<any> {
    const sortField = String(req.query.sort);
    const pageRequest: PageRequest = new PageRequest(
      Number(req.query.page),
      Number(req.query.size),
      sortField,
    );
    const [results, count] = await this.userService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(
      req.res,
      new Page(results, count, pageRequest),
    );
    return { data: results, total: count };
  }

  @Post('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(
    @Req() req: Request,
    @Body() userDTO: UserDTO,
  ): Promise<UserDTO> {
    const created = await this.userService.save(userDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'User', created.userId);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UserDTO,
  })
  async updateUser(
    @Req() req: Request,
    @Body() userDTO: UserDTO,
  ): Promise<UserDTO> {
    const userOnDb = await this.userService.find({
      where: { userId: userDTO.userId },
    });
    let updated = false;
    if (userOnDb && userOnDb.userId) {
      userDTO.userId = userOnDb.userId;
      updated = true;
    } else {
      userDTO.password = userDTO.password;
    }
    const createdOrUpdated = await this.userService.update(
      userDTO
    );
    if (updated) {
      HeaderUtil.addEntityUpdatedHeaders(req.res, 'User', createdOrUpdated.userId);
    } else {
      HeaderUtil.addEntityCreatedHeaders(req.res, 'User', createdOrUpdated.userId);
    }
    return createdOrUpdated;
  }

  @Get('/:login')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserDTO,
  })
  async getUser(@Param('login') loginValue: number): Promise<UserDTO> {
    const relationshipNames = [];
    relationshipNames.push('devices');
    relationshipNames.push('group');
    relationshipNames.push('authorities');
    return await this.userService.find({
      where: { userId: loginValue },
      relations: relationshipNames,
    });
  }

  @Delete('/:login')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
    type: UserDTO,
  })
  async deleteUser(
    @Req() req: Request,
    @Param('login') loginValue: number,
  ): Promise<UserDTO> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'User', loginValue);
    const userToDelete = await this.userService.find({
      where: { userId: loginValue },
    });
    return await this.userService.delete(userToDelete);
  }
}
