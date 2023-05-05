import { RocketPersonnelAccount } from '../../entities/RocketPersonnelAccount';
import { UserDTO } from './user.dto';

/**
 * An User mapper object.
 */
export class UserMapper {
  static fromDTOtoEntity(userDTO: UserDTO): RocketPersonnelAccount {
    if (!userDTO) {
      return;
    }
    const user = new RocketPersonnelAccount();
    const fields = Object.getOwnPropertyNames(userDTO);
    fields.forEach((field) => {
      user[field] = userDTO[field];
    });
    return user;
  }

  static fromEntityToDTO(user: RocketPersonnelAccount): UserDTO {
    if (!user) {
      return;
    }
    const userDTO = new UserDTO();

    const fields = Object.getOwnPropertyNames(user);

    fields.forEach((field) => {
      userDTO[field] = user[field];
    });

    return userDTO;
  }
}
