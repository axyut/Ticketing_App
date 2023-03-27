import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Provide a Valid Email."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be 4 to 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //handle error
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    throw new DatabaseConnectionError();

    res.send({ email, password });
  }
);

export { router as signUpRouter };
