import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import "./App.css";
import RestaurantsView from "./components/RestaurantsView";
import { restaurantStore } from "./store/restaurantStore";

// Init apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}graphql`,

  cache: new InMemoryCache({ addTypename: false }),
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#323cf0",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider store={restaurantStore}>
          <RestaurantsView />
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
