import CustomAPIError from './custom-api.js';
import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
