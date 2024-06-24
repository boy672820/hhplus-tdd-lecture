export enum ErrorCode {
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATED = 'DUPLICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class ApplicationError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }

  static of(errorCode: ErrorCode, message: string) {
    return new ApplicationError(errorCode, message);
  }

  static invalidParameter(message: string) {
    return new ApplicationError(ErrorCode.INVALID_PARAMETER, message);
  }

  static notFound(message: string) {
    return new ApplicationError(ErrorCode.NOT_FOUND, message);
  }

  static duplicated(message: string) {
    return new ApplicationError(ErrorCode.DUPLICATED, message);
  }

  static unauthorized(message: string) {
    return new ApplicationError(ErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new ApplicationError(ErrorCode.FORBIDDEN, message);
  }

  static internalError(message: string) {
    return new ApplicationError(ErrorCode.INTERNAL_ERROR, message);
  }
}
