import CustomAPIError from './custom-api.js';
import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
