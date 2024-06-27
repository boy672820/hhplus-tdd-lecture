import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainError, DomainErrorCode } from '../lib/errors';

type HttpError = {
  code: HttpErrorCode;
  error: string;
  message: string;
};

enum HttpErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_ERROR = 500,
}

const httpErrorMap: Record<HttpErrorCode, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(error: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    switch (error.code) {
      case DomainErrorCode.INVALID_PARAMETER:
        return response
          .status(400)
          .json(this.convertToHttpError(400, error.message));
      case DomainErrorCode.NOT_FOUND:
        return response
          .status(404)
          .json(this.convertToHttpError(404, error.message));
      case DomainErrorCode.DUPLICATED:
        return response
          .status(409)
          .json(this.convertToHttpError(409, error.message));
      case DomainErrorCode.UNAUTHORIZED:
        return response
          .status(401)
          .json(this.convertToHttpError(401, error.message));
      case DomainErrorCode.FORBIDDEN:
        return response
          .status(403)
          .json(this.convertToHttpError(403, error.message));
      case DomainErrorCode.LIMIT_EXCEEDED:
        return response
          .status(403)
          .json(this.convertToHttpError(403, error.message));
      case DomainErrorCode.INTERNAL_ERROR:
        return response
          .status(500)
          .json(this.convertToHttpError(500, error.message));
      default:
        return response.status(500).json({
          code: 500,
          message: 'Internal server error',
        });
    }
  }

  private convertToHttpError = (
    code: HttpErrorCode,
    message: string,
  ): HttpError => ({
    code,
    error: httpErrorMap[code],
    message,
  });
}
