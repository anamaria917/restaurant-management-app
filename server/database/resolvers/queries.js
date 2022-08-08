import DatabaseHelper from "../../helpers/databaseHelper";

export default {
  async restaurants(_, args) {
    const { page, pageSize, searchTerm } = args;

    const t = await DatabaseHelper.db.query(
      "select * from restaurant limit ? offset ?",
      {
        replacements: [pageSize, page],
      }
    );

    return t[0];
  },
  async searchRestaurants(_, args) {
    const { page, pageSize, searchTerm } = args;

    const whereCondition = searchTerm
      ? `where name like '%${searchTerm}%' or address like '%${searchTerm}%' or email like '%${searchTerm}%' or phone like '%${searchTerm}%'`
      : "";

    const t = await DatabaseHelper.db.query(
      `select * from restaurant ${whereCondition} limit ? offset ?`,
      { replacements: [pageSize, page] }
    );

    return t[0];
  },
};
