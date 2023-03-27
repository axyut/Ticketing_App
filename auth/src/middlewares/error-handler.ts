import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/database-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("handling error via request-validation");

    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });

    return res.status(400).send({ errors: formattedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log("handling error via database connection error");

    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  res.status(400).send({
    errors: [{ message: "Something Went Wrong 'Generic'" }],
  });
};
