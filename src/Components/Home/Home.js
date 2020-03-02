import React, { Component } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className="flex">
                <Sidebar />
                <div className="w-4/5 bg-nebula-primary">
                    <Navbar />
                    <Content />
                </div>
            </div>
        );
    }
}

export default Home;