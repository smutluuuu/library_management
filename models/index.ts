import { Sequelize } from "sequelize";
import User, { initUserModel } from "./user";
import Book, { initBookModel } from "./book";
import BorrowedBook, { initBorrowedBookModel } from "./borrowedBook";

const sequelize = new Sequelize("library_management", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

initUserModel(sequelize);
initBookModel(sequelize);
initBorrowedBookModel(sequelize);

BorrowedBook.belongsTo(Book, { foreignKey: "bookId", as: "BookAlias" });
Book.hasMany(BorrowedBook, { foreignKey: "bookId", as: "BookAlias" });

BorrowedBook.belongsTo(User, { foreignKey: "userId", as: "UserAlias" });
User.hasMany(BorrowedBook, { foreignKey: "userId", as: "UserAlias" });

export { sequelize, User, Book, BorrowedBook };