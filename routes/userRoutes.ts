import express from "express";
import { getUsers, createUser, borrowBook, returnBook } from "../controllers/userController";
import { validateCreateUser, validateBorrowBook, validateReturnBook } from "../middlewares/validators";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.get("/:id?", getUsers);

router.post("/", validateCreateUser, validate, createUser);
router.post("/:id/borrow/:bookId", validateBorrowBook, validate, borrowBook);

router.post("/:id/return/:bookId", validateReturnBook, validate, returnBook);

export default router;
