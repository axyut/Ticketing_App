import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    // because this is base class
    super();

    // only because we are extending built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
