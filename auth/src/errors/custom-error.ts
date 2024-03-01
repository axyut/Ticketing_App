export abstract class CustomError extends Error {
  // any custom error must have a status code property as number
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
    console.log(this);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
