export default `
type Query {
  restaurants(page: Int, pageSize: Int): [restaurant]
  searchRestaurants(searchTerm: String, page: Int, pageSize:Int): [restaurant]
  countRestaurants(searchTerm: String): Int
}
`;
