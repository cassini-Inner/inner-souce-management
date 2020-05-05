import React, { useState } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router";
import { authenticateUserUrl } from "../../../Configuration";
import axios from "axios";

const Authenticate = (props) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if(code) {
        axios.post(authenticateUserUrl, {
            Code: code,
          },  {withCredentials: true})
          .then(
              res => {
                props.history.push("/");
            },
            err => {
                alert("Authentication error:"+ err);
            }
          );
        
    }

    return <Redirect to={{
        pathname: "/login",
        search: "",
        state: { msg: "Please sign in with github to continue!" }
    }} />;
};



export default withRouter(Authenticate);
