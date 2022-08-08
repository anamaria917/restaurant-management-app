import { gql } from "apollo-server-express";
import mutations from "./defs/mutations";
import queries from "./defs/queries";
import databaseTypes from "./defs/databaseTypes";

const schema = gql`
  ${databaseTypes}
  ${queries}
  ${mutations}
`;

export default schema;
