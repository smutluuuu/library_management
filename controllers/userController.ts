import { Request, Response } from "express";
import User from "../models/user";
import BorrowedBook from "../models/borrowedBook";
import Book from "../models/book";
import { Op } from "@sequelize/core";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findByPk(id, { attributes: ["id", "name"] });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const currentBooks = await BorrowedBook.findAll({
        where: { userId: id, returnDate: null },
        include: { model: Book, as: "BookAlias", attributes: ["name"] },
      });
      const pastBooks = await BorrowedBook.findAll({
        where: { userId: id, returnDate: { [Op.ne]: null } },
        include: { model: Book, as: "BookAlias", attributes: ["name"] },
      });

      res.status(200).json({ user, currentBooks, pastBooks });
      return;
    }

    const users = await User.findAll({ attributes: ["id", "name"] });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An error occurred" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  try {
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  const { id: userId, bookId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    const isBorrowed = await BorrowedBook.findOne({
      where: {
        bookId,
        returnDate: null,
      },
    });
    if (isBorrowed) {
      res.status(400).json({ error: "Book is already borrowed" });
      return;
    }

    const borrowedBook = await BorrowedBook.create({
      userId,
      bookId,
      borrowDate: new Date(),
    });

    res.status(201).json({
      message: "Book successfully borrowed",
      borrowedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An error occurred" });
  }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  const { id: userId, bookId } = req.params;
  const { score } = req.body;

  try {
    const borrowedBook = await BorrowedBook.findOne({
      where: {
        userId,
        bookId,
        returnDate: null,
      },
    });

    if (!borrowedBook) {
      res.status(400).json({ error: "Book is not currently borrowed by this or another user" });
      return;
    }

    borrowedBook.setDataValue("returnDate", new Date());
    borrowedBook.setDataValue("rating", score);
    await borrowedBook.save();

    const ratings = await BorrowedBook.findAll({
      where: { bookId, rating: { [Op.ne]: null } },
      attributes: ["rating"],
      raw: true,
    });

    const totalRating = ratings.reduce((sum, record) => {
      return sum + (record.rating || 0);
    }, 0);

    const averageRating = totalRating / ratings.length;

    const book = await Book.findByPk(bookId);
    if (book) {
      book.setDataValue("averageRating", averageRating);
      await book.save();
    }

    res.status(200).json({
      message: "Book successfully returned and rating updated",
      borrowedBook,
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An error occurred" });
  }
};
