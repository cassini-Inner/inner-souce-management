import React, { Component } from "react";
import {  NotificationIcon } from "../Common/Icons";
import SearchBar from "../Common/SearchBar/SearchBar";

class Navbar extends Component {

    render() {
        return (
            <div className="h-24 bg-nebula-grey-200 items-center flex">
                <div className="flex-1 flex items-center h-12">
                    <SearchBar className="h-12 mr-4 bg-nebula-grey-400" inputClass="bg-nebula-grey-400 placeholder-nebula-grey-600" />
                    {/* Svg for notifications */}
                    <div className="flex-0 bg-nebula-grey-400 mr-4 rounded-full h-12 w-12 flex items-center">
                        <NotificationIcon className="h-6 w-6 flex-1 hover:text-nebula-blue" />
                    </div>
                    <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                </div >
            </div>
        );
    }
}


 
export default Navbar;