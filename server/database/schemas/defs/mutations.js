export default `
type Mutation {
  createRestaurant(name: String!, address: String!, email: String!, phone: String!): Boolean
  updateRestaurant(id: Int!, name: String, address: String, email: String, phone: String): Boolean
  deleteRestaurant(id: Int!): Boolean
}
`;
