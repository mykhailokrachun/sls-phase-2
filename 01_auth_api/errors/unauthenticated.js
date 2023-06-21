import CustomAPIError from './custom-api.js';
import httpStatusCodes from 'http-status-codes';

const { StatusCodes } = httpStatusCodes;

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
