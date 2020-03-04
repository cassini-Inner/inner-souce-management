import React, { Component } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className="flex container mx-auto bg-nebula-grey-200">
                <Sidebar />
                <div className="w-full md:w-4/5 mx-10">
                    <Navbar />
                    <Content />
                </div>
            </div>
        );
    }
}

export default Home;