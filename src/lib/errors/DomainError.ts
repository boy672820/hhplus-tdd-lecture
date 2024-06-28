export enum DomainErrorCode {
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATED = 'DUPLICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class DomainError extends Error {
  constructor(
    public readonly code: DomainErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }

  static of(errorCode: DomainErrorCode, message: string) {
    return new DomainError(errorCode, message);
  }

  static invalidParameter(message: string) {
    return new DomainError(DomainErrorCode.INVALID_PARAMETER, message);
  }

  static notFound(message: string) {
    return new DomainError(DomainErrorCode.NOT_FOUND, message);
  }

  static duplicated(message: string) {
    return new DomainError(DomainErrorCode.DUPLICATED, message);
  }

  static unauthorized(message: string) {
    return new DomainError(DomainErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new DomainError(DomainErrorCode.FORBIDDEN, message);
  }

  static limitExceeded(message: string) {
    return new DomainError(DomainErrorCode.LIMIT_EXCEEDED, message);
  }

  static internalError(message: string) {
    return new DomainError(DomainErrorCode.INTERNAL_ERROR, message);
  }
}
