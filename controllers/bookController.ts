import { Request, Response } from "express";
import Book from "../models/book";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (id) {
    const book = await Book.findByPk(id, { attributes: ["id", "name", "averageRating"] });
    if (!book) {
      res.status(400).json({ error: "Book no found" });
      return;
    }
    res.status(200).json({ book });
    return;
  }
  try {
    const books = await Book.findAll({ attributes: ["id", "name", "averageRating"] });
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const book = await Book.create({ name });
    res.status(201).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
};
