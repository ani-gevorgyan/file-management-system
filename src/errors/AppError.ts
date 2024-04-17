import ErrorData from './ErrorData';

abstract class AppError extends Error {
  code: number;

  protected constructor(code: number, message: string) {
    super(message);

    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract getErrorData(): ErrorData;
}

export default AppError;
