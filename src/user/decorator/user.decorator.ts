import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const LoginUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User데코레이터는 TokenGuar와 함께 사용해야 합니다. Requeset에 유저 property가 존재하지 않습니다',
      );
    }

    return user;
  },
);
