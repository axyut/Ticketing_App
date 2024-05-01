import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { RequestValidationError, BadRequestError } from "@chillarcs/common";
import { User } from "../models/User";

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
      const errs = errors.array();
      throw new RequestValidationError(errs);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequestError("Email in Use.");
    }
    const user = User.build({
      email,
      password,
    });
    const newUser = await user.save();
    console.log("New user created.");

    // handle jwt
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_PASS as string
    );
    req.session = {
      jwt: userJwt,
    };
    res.send(newUser);
  }
);

export { router as signUpRouter };
