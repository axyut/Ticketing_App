import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    try {
      const userExists = await User.findOne({ email })
      if (userExists) {
        throw new BadRequestError("Email in Use.")
      }
      const user = User.build({
        email, password
      })
      const newUser = await user.save()
      console.log("New user created.")
      res.send({
        email: newUser.email,
        id: newUser._id
      })

    } catch (error) {
      console.log(error);
      throw new DatabaseConnectionError()
    }
  }
);

export { router as signUpRouter };
