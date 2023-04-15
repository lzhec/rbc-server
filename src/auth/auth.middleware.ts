import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  public use(request: Request, response: Response, next: NextFunction): void {
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!authorization?.startsWith('Bearer') || !token) {
      throw new UnauthorizedException('You are not authorized');
    }

    request['user'] = verify(token, process.env.PRIVATE_KEY);

    next();
  }
}
