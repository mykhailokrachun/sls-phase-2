import CustomAPIError from './custom-api.js';
import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
