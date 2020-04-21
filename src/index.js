import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "../assets/style/index.css";
import {  ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
const client = new ApolloClient({
    uri: "http://localhost:8080/query",
});
  
// const rootReducer = combineReducers({

// });

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
    <ApolloProvider client = {client}>
        <App />
    </ApolloProvider>, 
    document.getElementById("App")
);