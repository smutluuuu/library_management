import { body, param } from "express-validator";

export const validateCreateUser = [body("name").isString().withMessage("Name must be a string").notEmpty().withMessage("Name is required")];

export const validateBorrowBook = [param("id").isInt({ gt: 0 }).withMessage("User ID must be a positive integer"), param("bookId").isInt({ gt: 0 }).withMessage("Book ID must be a positive integer")];

export const validateReturnBook = [
  param("id").isInt({ gt: 0 }).withMessage("User ID must be a positive integer"),
  param("bookId").isInt({ gt: 0 }).withMessage("Book ID must be a positive integer"),
  body("score").isInt({ min: 0, max: 10 }).withMessage("Score must be an integer between 0 and 10"),
];

export const validateCreateBook = [body("name").isString().withMessage("Name must be a string").trim().notEmpty().withMessage("Name is required and cannot be empty or only spaces")];
