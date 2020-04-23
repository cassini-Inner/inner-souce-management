import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "../assets/style/index.css";
import {  ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import userReducer from "./Store/reducers/user";
import createJobReducer from "./Store/reducers/createJob";

const client = new ApolloClient({
    uri: "http://localhost:8080/query",
});
  
const rootReducer = combineReducers({
    user: userReducer,
    createJob: createJobReducer,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <ApolloProvider client = {client}>
        <Provider store = {store}>
            <App />
        </Provider>
    </ApolloProvider>, 
    document.getElementById("App")
);