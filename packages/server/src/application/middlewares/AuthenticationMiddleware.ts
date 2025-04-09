import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { env } from '../../config/env';
import type { IData, IMiddleware, IRequest, IResponse } from "../interfaces/IMiddleware";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({headers}: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if(!authorization) {
      return {
        statusCode: 401,
        body: {
          message: 'Unauthorized - Token not provided'
        }
      }
    }

    try {
      const [, token] = authorization.split(' ');
      
      if (!token) {
        return {
          statusCode: 401,
          body: {
            message: 'Unauthorized - Invalid token format'
          }
        }
      }

      const decoded = verify(token, env.JWT_SECRET) as JwtPayload;
      
      return {
        data: {
          userId: decoded.sub
        }
      }
    } catch {
      return {
        statusCode: 401,
        body: {
          message: 'Unauthorized - Invalid token'
        }
      }
    }
  }
}


