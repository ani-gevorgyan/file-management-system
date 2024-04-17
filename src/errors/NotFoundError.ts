import AppError from './AppError';
import ErrorData from './ErrorData';

interface NotFoundErrorData extends ErrorData {}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(404, message);
  }

  getErrorData(): NotFoundErrorData {
    return {
      message: this.message,
    };
  }
}

export default NotFoundError;
