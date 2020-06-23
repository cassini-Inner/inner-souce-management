import React, { Component, useContext, useRef, useState } from "react";
import * as Icons from "react-feather";
import SearchBar from "../../Common/SearchBar/SearchBar";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import Axios from "axios";
import Avatar from "../../Common/Avatar/Avatar";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import Button from "../../Common/Button/Button";
import Portal from "../../Containers/Portal";
import ModalViewWithScrim from "../../Modals/ModalViewWithScrim";
import { useClickOutside } from "../../../hooks/useClickOutside/hook";
import { TranslateEnterAnimation } from "../../AnimationHelpers/TranslateMountWidget";

const Navbar = () => {
    const { user } = useContext(AuthenticationContext);

    const [profileModalState, setProfileModalState] = useState(false);
    const [mouseInside, setMouseInside] = useState(false);
    const {
        ref: searchRef,
        setIsComponentVisible: setSearchVisible,
        isComponentVisible: searchVisible,
    } = useClickOutside(false);
    
    const openProfilePopup = (event) => {
        setProfileModalState(true);
        setMouseInside(true);
    };

    const closePopup = () => {
        setMouseInside(false);
        const allowClose = !mouseInside;
        setTimeout(
            () => {
                if (!allowClose) {
                    setProfileModalState(false);
                }
            },
            200
        );
    };

    const handleMouseOver = (value) => {
        setMouseInside(value);
    };

    return (
        <div className="lg:sticky bg-white top-0 py-4">
            <div className="flex items-center justify-end flex-row w-full">
                <Portal isOpen={searchVisible} scrim={true} >
                    <TranslateEnterAnimation visible={searchVisible}>
                        <SearchBar forwardedRef={searchRef} searchOpen={searchVisible} setSearchOpen={(value)=>setSearchVisible(value)}/>
                    </TranslateEnterAnimation>
                </Portal>
                <button onClick={()=> {setSearchVisible(true);}} className="flex-0 bg-nebula-grey-300 mr-4 rounded-full h-10 w-10 flex items-center">
                    <Icons.Search className="h-6 w-6 flex-1 hover:text-nebula-blue" />
                </button>
                <div className="flex-0 bg-nebula-grey-300 mr-4 rounded-full h-10 w-10 flex items-center">
                    <Icons.Bell className="h-6 w-6 flex-1 hover:text-nebula-blue" />
                </div>
                <button onClick={openProfilePopup} >
                    <Avatar imagePath={user.photoUrl} className="w-10 h-10" />
                </button>
                <ProfileModal
                    onMouseOver={handleMouseOver}
                    onMouseLeave={closePopup}
                    profileModalOpen={profileModalState}
                />
            </div>
        </div>

    );
};

const ProfileModal = ({ profileModalOpen, className, onMouseOver, onMouseLeave, handleMouseOver }) => {
    const { user, signOut } = useContext(AuthenticationContext);
    const modalRef = useRef();
    return (
        <CSSTransition
            in={profileModalOpen }
            timeout={150}
            appear
            unmountOnExit
            classNames={{
                enter: "opacity-0 transition duration-150 transform translate-y-2 translate-x-2",
                enterDone: "opacity-100 transition duration-150 transform translate-y-0 translate-x-0",
                exit: "opacity-0 transition duration-150 transform translate-y-2 translate-x-2",
            }}
        >
            <div ref = {modalRef} className={"z-30 w-96 mt-2 absolute top-0 right-0 inline-block" + className || ""} onMouseOver={() => onMouseOver(true)} onMouseLeave={onMouseLeave}>
                <div className="overflow-hidden  w-full shadow-lg shadow-2xl rounded-lg p-4 pr-20 bg-white" >
                    <div className="flex p-4" >
                        <Avatar imagePath={user.photoUrl} className="h-10 w-10 " />
                        <div className="font-semibold leading-tight ml-8">
                            <p className="text-nebula-grey-600 text-xs">Signed in as</p>
                            <p className="text-lg mb-2">{user.name}</p>
                            <Link to={"/profile/" + user.id} className="text-xs text-nebula-blue tracking-widest">VIEW PROFILE</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="flex mt-4 text-nebula-blue font-semibold cursor-pointer" onClick={signOut}>
                        <Icons.LogOut className="stroke-current ml-4 mr-8" />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </CSSTransition>

    );
};

ProfileModal.propTypes = {
    className: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    profileModalOpen: PropTypes.bool,
};

export default (withRouter(Navbar));
