import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "../assets/style/index.css";
import {  ApolloProvider } from "@apollo/react-components";
import {  ApolloProvider as ApolloHooksProvider  } from "@apollo/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./Store/reducers/user";
import jobFilterReducer from "./Store/reducers/jobFilterModal";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Cookies from "js-cookie";


const httpLink = new createHttpLink({ uri: 'http://localhost:8080/query', credentials: 'include' });
//To set the authorization header from cookies
const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : "",
        },
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});
  
  
const rootReducer = combineReducers({
    user: userReducer,
    jobFilter: jobFilterReducer,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <ApolloHooksProvider client = {client}>
        <ApolloProvider client={client}>
            <Provider store = {store}>
                <App />
            </Provider>
        </ApolloProvider>
    </ApolloHooksProvider>,
    document.getElementById("App")
);