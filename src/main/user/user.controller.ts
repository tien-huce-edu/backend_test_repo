import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("api/user")
@ApiTags("api/user")
export class UserController {}
