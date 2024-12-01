import { DataTypes, Model, Sequelize } from "sequelize";
import Book from "./book";
import User from "./user";

export default class BorrowedBook extends Model {
  public id!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public rating!: number | null;
  public userId!: number;
  public bookId!: number;

  public BookAlias?: Book;
}

export const initBorrowedBookModel = (sequelize: Sequelize) => {
  BorrowedBook.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 1, max: 10 },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BorrowedBook",
      tableName: "borrowed_books",
    }
  );
};
