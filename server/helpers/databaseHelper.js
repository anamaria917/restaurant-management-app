import { Sequelize } from "sequelize";

export default class DatabaseHelper {
  static db = null;

  static initialize() {
    this.db = new Sequelize({
      dialect: "mysql",
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
    });
  }

  static initialized() {
    return this.db.authenticate();
  }
}
