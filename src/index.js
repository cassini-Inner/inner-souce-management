import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "../assets/style/index.css";
import {  ApolloProvider } from "@apollo/react-components";
import {  ApolloProvider as ApolloHooksProvider  } from "@apollo/client";
// import ApolloClient from "apollo-boost";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./Store/reducers/user";
import jobFilterReducer from "./Store/reducers/jobFilterModal";
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    headers: { Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODgzMzU1MjQsImp0aSI6IjQiLCJpYXQiOjE1ODc3MzA3MjQsImlzcyI6ImlubmVyc291cmNlIn0.FSaoi6Jnc4ZGr4UPZdP7seuXzJWnWv4cnxXfnPBvGBU" },
    cache: new InMemoryCache(),
    link: new HttpLink({
    uri: 'http://localhost:8080/query',
    })
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