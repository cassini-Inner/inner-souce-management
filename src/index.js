import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./assets/style/tailwind.css";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/client";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";


const GRAPH_API_URL = process.env.GRAPH_API_URL;
const httpLink = new createHttpLink({ uri: `${GRAPH_API_URL}`, credentials: "include" });

//To set the authorization header from cookies
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

ReactDOM.render(
    <ApolloHooksProvider client={client}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </ApolloHooksProvider>,
    document.getElementById("App")
);
