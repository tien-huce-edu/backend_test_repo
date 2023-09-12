import { TblMasterData } from "../../../entities/tbl_master_data.entity";
import { MasterDataDTO } from "./master-data.dto";

export class MasterDataMapper {
  static fromEntityToDTO(master: TblMasterData): MasterDataDTO {
    if (!master) {
      return;
    }
    const masterDataDTO = new MasterDataDTO();

    const fields = Object.getOwnPropertyNames(master);

    fields.forEach((field) => {
      masterDataDTO[field] = master[field];
    });

    return masterDataDTO;
  }
}
