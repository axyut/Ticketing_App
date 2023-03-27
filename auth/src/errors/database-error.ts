export class DatabaseConnectionError extends Error {
  reason = "Error Connecting to Database";
  constructor() {
    // because this is not base class
    super();

    // only because we are extending built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
