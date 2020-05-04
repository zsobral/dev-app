import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { useAuth } from "./Auth";

const cache = new InMemoryCache();

const createApolloClient = (getToken) => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext(async () => {
    try {
      const accessToken = await getToken();
      return { headers: { authorization: `Bearer ${accessToken}` } };
    } catch (error) {
      return {};
    }
  });

  return new ApolloClient({ cache, link: authLink.concat(httpLink) });
};

export const ApolloProviderWithAuth = ({ children }) => {
  const { getToken } = useAuth();
  const client = createApolloClient(getToken);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
