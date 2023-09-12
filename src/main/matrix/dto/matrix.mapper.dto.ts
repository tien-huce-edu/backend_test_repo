import { TblMatrix } from "../../../entities/tbl_matrix.entity";
import { MatrixDTO } from "./matrix.dto";

export class MatrixMapper {
  static fromEntityToDTO(matrix: TblMatrix): MatrixDTO {
    if (!matrix) {
      return;
    }
    const matrixDTO = new MatrixDTO();

    const fields = Object.getOwnPropertyNames(matrix);

    fields.forEach((field) => {
      matrixDTO[field] = matrix[field];
    });

    return matrixDTO;
  }
}
