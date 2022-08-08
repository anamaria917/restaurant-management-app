import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query restaurants($page: Int!, $pageSize: Int!) {
    restaurants(page: $page, pageSize: $pageSize) {
      id
      name
      address
      email
      phone
    }
  }
`;

export const SEARCH_RESTAURANTS = gql`
  query searchRestaurants($searchTerm: String, $page: Int, $pageSize: Int) {
    searchRestaurants(
      searchTerm: $searchTerm
      page: $page
      pageSize: $pageSize
    ) {
      id
      name
      address
      email
      phone
    }
  }
`;
