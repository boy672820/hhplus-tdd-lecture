import { ValidationPipeOptions } from '@nestjs/common';

/**
 * 기본 포트 번호
 */
export const port = Number(process.env.PORT) || 3000;

/**
 * ValidationPipe 설정
 */
export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
};
