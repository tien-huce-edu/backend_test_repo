import { TblRoles } from "../../entities/bi_report/tbl_roles.entity";
import { RoleDto } from "./dto/role.dto";

/**
 * An User mapper object.
 */
export class RoleMapper {
  static fromEntityToDTO(role: TblRoles): RoleDto {
    if (!role) {
      return;
    }
    const roleDto = new RoleDto();
    const fields = Object.getOwnPropertyNames(role);
    fields.forEach((field) => {
      roleDto[field] = role[field];
    });

    return roleDto;
  }
}
