import { DataTypes, Model, Sequelize } from "sequelize";
import BorrowedBook from "./borrowedBook";

export default class Book extends Model {
  public id!: number;
  public name!: string;
  public averageRating!: number;
}

export const initBookModel = (sequelize: Sequelize) => {
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      averageRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
    }
  );
};
