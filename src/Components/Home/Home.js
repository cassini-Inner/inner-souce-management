import React, { Component } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <div className="flex">
                <Sidebar />
                <div className="w-4/5 bg-nebula-grey-200">
                    <Navbar />
                    <Content setModalState = { this.props.setModalState }/>
                </div>
            </div>
        );
    }
}

export default Home;