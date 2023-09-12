import { MatrixDTO } from "../main/matrix/dto/matrix.dto";

export interface Payload {
  id: number;
  username: string;
  roles?: MatrixDTO[];
}
