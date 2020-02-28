import React, { Component } from 'react';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

class Home extends Component {
    render() {
        return (
            <div className="flex flex-wrap w-full">
                <Sidebar />
                <Navbar />
                <div className="w-4/5 h-auto">
                    
                </div>
            </div>
        );
    }
}

export default Home;