import { gql } from "@apollo/client";

export const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant($id: Int!) {
    deleteRestaurant(id: $id)
  }
`;

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant(
    $name: String!
    $address: String!
    $email: String!
    $phone: String!
  ) {
    createRestaurant(
      name: $name
      address: $address
      email: $email
      phone: $phone
    )
  }
`;

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant(
    $id: Int!
    $name: String!
    $address: String!
    $email: String!
    $phone: String!
  ) {
    updateRestaurant(
      id: $id
      name: $name
      address: $address
      email: $email
      phone: $phone
    )
  }
`;
