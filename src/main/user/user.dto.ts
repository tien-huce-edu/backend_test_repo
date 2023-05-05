import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';
import { BaseDTO } from '../base/base.dto';

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {

  @ApiProperty({
    uniqueItems: true,
    example: 'myuser',
    description: 'User login',
  })
  @IsString()
  userId: number;

  @ApiProperty({
    example: 'MyUser',
    description: 'User first name',
    required: false,
  })
  personnelCode: number;

  @ApiProperty({
    example: 'Password',
    description: 'Password',
    required: false,
  })
  password: string;

  @ApiProperty({
    example: 'rolename',
    description: 'rolename',
    required: false,
  })
  rolename: string;


  @ApiProperty({ example: 'myuser@localhost.it', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'true',
    description: 'User activation',
    required: false,
  })
  lock: number;

  @ApiProperty({
    isArray: true,
    enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'],
    description: 'Array of permissions',
    required: false,
  })
  rocketAccountRoles: any[];
}
