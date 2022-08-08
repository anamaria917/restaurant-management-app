import { ApolloServer } from "apollo-server-express";

import schema from "./schemas/schema";
import resolvers from "./resolvers/resolvers";

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

export default apolloServer;
