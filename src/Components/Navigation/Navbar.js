import React, { Component } from "react";
import * as Icons from "react-feather";
import SearchBar from "../Common/SearchBar/SearchBar";
import Portal from "../Containers/Portal";
import ProfileModal from "../Modals/ProfileModal";
import { Link } from "react-router-dom";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileModalOpen: false,
            rect: null,
            popupStyle: null,
        };
        this.openProfilePopup = this.openProfilePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.profileIcon = React.createRef();
    }

    openProfilePopup(event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        this.setState({
            profileModalOpen: true,
            rect: rect,
            popupStyle: {
                left: ((rect.x ) + "px"),
                top: ((rect.y) + "px"),
                position: "absolute",
            }
        });
    }

    closePopup() {
        this.setState({
            profileModalOpen: false,
        });
    }

    render() {
        console.log(this.profileIcon);
        return (
            <div className="h-24 items-center flex z-10">
                <div className="flex-1 flex items-center h-12">
                    <SearchBar className="h-12 mr-4 bg-nebula-grey-300" inputClass="bg-nebula-grey-300 placeholder-nebula-grey-600" />
                    {/* Svg for notifications */}
                    <div className="flex-0 bg-nebula-grey-300 mr-4 rounded-full h-12 w-12 flex items-center">
                        <Icons.Bell className="h-6 w-6 flex-1 hover:text-nebula-blue" />
                    </div>
                    <button ref={this.profileIcon} onClick={this.openProfilePopup} >
                        <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                    </button>
                </div >
                {
                    this.state.profileModalOpen &&
                    <div className="absolute " style={this.state.popupStyle}>
                        <div className="max-w-x w-full shadow-lg shadow-2xl rounded-lg p-4 pr-20 z-50 bg-white" >
                            <div className="flex p-4" >
                                <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                                <div className="font-semibold leading-tight ml-8">
                                    <p className="text-nebula-grey-600 text-xs">Signed in as</p>
                                    <p className="text-lg mb-2">Tushar </p>
                                    <Link to="/profile" className="text-xs text-nebula-blue tracking-widest">VIEW PROFILE</Link>
                                </div>
                            </div>
                            <hr />
                            <Link to="/login" className="flex mt-4 text-nebula-blue font-semibold" >
                                <Icons.LogOut className="stroke-current ml-4 mr-8" />
                                <p>Logout</p>
                            </Link>
                        </div>
                    </div>
                }
                {/* <Portal isOpen={this.state.profileModalOpen}>
                    <ProfileModal rect={this.state.rect} close={this.closePopup}></ProfileModal>
                </Portal> */}
            </div>
        );
    }
}

export default Navbar;
