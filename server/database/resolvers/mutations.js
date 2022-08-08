import DatabaseHelper from "../../helpers/databaseHelper";

export default {
  async createRestaurant(_, args) {
    const { name, address, email, phone } = args;

    await DatabaseHelper.db.query(
      "Insert into restaurant (name, address, email, phone) values (?,?,?,?)",
      { replacements: [name, address, email, phone] }
    );

    return true;
  },
  async updateRestaurant(_, args) {
    const { id, name, address, email, phone } = args;

    await DatabaseHelper.db.query(
      "Update restaurant set name = ?, address = ?, email = ?, phone = ? where id = ?",
      {
        replacements: [name, address, email, phone, id],
      }
    );

    return true;
  },
  async deleteRestaurant(_, args) {
    await DatabaseHelper.db.query("Delete from restaurant where id = ?", {
      replacements: [args.id],
    });

    return true;
  },
};
