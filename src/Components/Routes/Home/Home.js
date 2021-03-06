import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar/Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className=" px-4 lg:px-10 bg-white w-full ">
                <Navbar />
                <Content />
            </div>
        );
    }
}

export default Home;
