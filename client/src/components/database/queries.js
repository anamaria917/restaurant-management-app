import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query restaurants($page: Int!, $pageSize: Int!, $searchTerm: String) {
    restaurants(page: $page, pageSize: $pageSize) {
      id
      name
      address
      email
      phone
    }
    countRestaurants(searchTerm: $searchTerm)
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
    countRestaurants(searchTerm: $searchTerm)
  }
`;
