import * as bcrypt from "bcrypt";
import { config } from "../config/config";

export async function transformPassword(user: {
  password?: string;
}): Promise<any> {
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      config.get("security.jwt.hash-salt-or-rounds")
    );
  }
  return Promise.resolve(user.password);
}
