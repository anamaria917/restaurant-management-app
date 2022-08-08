import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";

import "./App.css";
import RestaurantsView from "./components/RestaurantsView";
import { restaurantStore } from "./components/store/restaurantStore";

// Init apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}graphql`,

  cache: new InMemoryCache({ addTypename: false }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={restaurantStore}>
        <RestaurantsView />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
