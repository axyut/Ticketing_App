import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error Connecting to Database";
  constructor() {
    // because this is not base class
    super("Error Connecting to DB");

    // only because we are extending built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
