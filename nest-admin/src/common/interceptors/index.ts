import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()//响应拦截器
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
          message: "Success",
          code: 200,
          timestamp: new Date().toISOString(),
        }
      })
    );
  }
}

export const setupInterceptors = (app) => {
  app.useGlobalInterceptors(new ResponseInterceptor());
}
