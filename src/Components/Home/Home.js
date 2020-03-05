import React, { Component, Fragment } from 'react';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Content from "./Content";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Sidebar page="home" />
                <div className="w-full lg:w-4/5 lg:mx-10">
                    <div className="px-4 md:px-0">
                        <Navbar />
                    </div>
                    <Content setModalState={this.props.setModalState} />
                </div>
            </Fragment>
        );
    }
}

export default Home;