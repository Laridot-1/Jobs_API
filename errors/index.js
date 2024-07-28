import { StatusCodes } from "http-status-codes"

class BaseError extends Error {
  constructor(message) {
    super(message)
  }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super(message)
    this.status = StatusCodes.BAD_REQUEST
  }
}

class UnauthenticatedError extends BaseError {
  constructor(message) {
    super(message)
    this.status = StatusCodes.UNAUTHORIZED
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(message)
    this.status = StatusCodes.NOT_FOUND
  }
}

export { BaseError, BadRequestError, UnauthenticatedError, NotFoundError }
