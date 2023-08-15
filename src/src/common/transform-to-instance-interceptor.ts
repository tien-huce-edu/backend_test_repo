import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TransformToInstance implements PipeTransform {
  constructor(private readonly className: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    return plainToInstance(this.className, value, {
      strategy: "excludeAll",
    }) as object as any;
  }
}
