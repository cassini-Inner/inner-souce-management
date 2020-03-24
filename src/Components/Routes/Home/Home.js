import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className=" px-4 lg:px-10">
                <Navbar />
                <Content />
            </div>
        );
    }
}

export default Home;
