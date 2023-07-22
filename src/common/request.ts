import { Request as ExpressRequest } from "express";
import { UserDTO } from "../main/user/user.dto";

export interface Request extends ExpressRequest {
  user?: UserDTO;
}
