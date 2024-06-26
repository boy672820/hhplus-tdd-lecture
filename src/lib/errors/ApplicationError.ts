export enum ApplicationErrorCode {
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATED = 'DUPLICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class ApplicationError extends Error {
  constructor(
    public readonly code: ApplicationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }

  static of(errorCode: ApplicationErrorCode, message: string) {
    return new ApplicationError(errorCode, message);
  }

  static invalidParameter(message: string) {
    return new ApplicationError(
      ApplicationErrorCode.INVALID_PARAMETER,
      message,
    );
  }

  static notFound(message: string) {
    return new ApplicationError(ApplicationErrorCode.NOT_FOUND, message);
  }

  static duplicated(message: string) {
    return new ApplicationError(ApplicationErrorCode.DUPLICATED, message);
  }

  static unauthorized(message: string) {
    return new ApplicationError(ApplicationErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new ApplicationError(ApplicationErrorCode.FORBIDDEN, message);
  }

  static internalError(message: string) {
    return new ApplicationError(ApplicationErrorCode.INTERNAL_ERROR, message);
  }
}
