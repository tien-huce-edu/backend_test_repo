import { Request as ExpressRequest } from "express";
import { UserDTO } from "../main/user/dto/user.dto";

export interface Request extends ExpressRequest {
  user?: UserDTO;
}
