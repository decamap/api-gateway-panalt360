import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HttpProxyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (user) {
      request.headers['user_id'] = user.id.toString();
    }

    return next.handle();
  }
}
