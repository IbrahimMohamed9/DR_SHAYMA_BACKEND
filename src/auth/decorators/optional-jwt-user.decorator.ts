import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const OptionalJwtUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
        return jwtService.verify(token).user; // Return the decoded user
      } catch (error) {
        // Token is invalid, but we don't throw an error since it's optional
      }
    }
    return null; // No token was present
  },
);
