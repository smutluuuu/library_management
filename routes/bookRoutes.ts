import express from "express";
import { createBook, getBooks } from "../controllers/bookController";
import { validate } from "../middlewares/validate";
import { validateCreateBook } from "../middlewares/validators";

const router = express.Router();

router.get("/:id?", getBooks);
router.post("/", validateCreateBook, validate, createBook);

export default router;
