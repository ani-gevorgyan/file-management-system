import AppError from './AppError';
import ErrorData from './ErrorData';

interface BadRequestErrorData extends ErrorData {}

class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message);
  }

  getErrorData(): BadRequestErrorData {
    return {
      message: this.message,
    };
  }
}

export default BadRequestError;
