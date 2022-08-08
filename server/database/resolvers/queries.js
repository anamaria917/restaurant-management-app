import DatabaseHelper from "../../helpers/databaseHelper";

function formatWhereQuery(searchTerm) {
  if (!searchTerm) {
    return "";
  }

  return `where name like '%${searchTerm}%' or address like '%${searchTerm}%' or email like '%${searchTerm}%' or phone like '%${searchTerm}%'`;
}

export default {
  async restaurants(_, args) {
    const { page, pageSize } = args;

    const response = await DatabaseHelper.db.query(
      "select * from restaurant limit ? offset ?",
      {
        replacements: [pageSize, page],
      }
    );

    return response[0];
  },
  async searchRestaurants(_, args) {
    const { page, pageSize, searchTerm } = args;

    const whereCondition = formatWhereQuery(searchTerm);

    const response = await DatabaseHelper.db.query(
      `select * from restaurant ${whereCondition} limit ? offset ?`,
      { replacements: [pageSize, page] }
    );

    return response[0];
  },

  async countRestaurants(_, args) {
    const { searchTerm } = args;

    const whereCondition = formatWhereQuery(searchTerm);

    const response = await DatabaseHelper.db.query(
      `select count(*) as total from restaurant ${whereCondition}`,
      { replacements: [searchTerm] }
    );

    return response?.[0]?.[0]?.total || 0;
  },
};
