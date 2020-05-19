import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./assets/style/index.css";
import "./assets/style/tailwind.css";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new createHttpLink({ uri: "http://localhost:8080/query", credentials: "include" });

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
