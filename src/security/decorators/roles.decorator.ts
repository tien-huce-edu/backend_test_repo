import { SetMetadata } from "@nestjs/common";

export const Roles = (endpoint: string, method: string): any =>
  SetMetadata("roles", { endpoint: endpoint, method: method });
