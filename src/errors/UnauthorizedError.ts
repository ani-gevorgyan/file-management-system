import ErrorData from './ErrorData';
import AppError from './AppError';

interface UnauthorizedErrorData extends ErrorData {}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized Request') {
    super(401, message);
  }

  getErrorData(): UnauthorizedErrorData {
    return {
      message: this.message,
    };
  }
}

export default UnauthorizedError;
