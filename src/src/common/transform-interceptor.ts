import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Observable, map } from "rxjs";

const IgnoredPropertyName = Symbol("IgnoredPropertyName");

export function CustomInterceptorIgnore() {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value[IgnoredPropertyName] = true;
  };
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    const isIgnored = context.getHandler()[IgnoredPropertyName];
    if (isIgnored) {
      return next.handle();
    } else {
      return next
        .handle()
        .pipe(map((data) => instanceToPlain(data, { strategy: "excludeAll" })));
    }
  }
}
