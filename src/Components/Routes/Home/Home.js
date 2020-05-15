import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className="flex flex-col-reverse lg:flex-row">

                <div className=" px-4 lg:px-10 bg-white w-full">
                    <Navbar />
                    <Content />
                </div>
            </div>
        );
    }
}

export default Home;
