import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

const Portal = (props) => {

    if (props.isOpen) {
        disableScroll();
        return ReactDOM.createPortal(
            <div className="fixed z-50 mx-auto inset-0">
                {props.children}
            </div>,
            modalRoot
        );
    }
    else {
        enableScroll();
        return ReactDOM.createPortal("", modalRoot);
    }
};

const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth ;
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = scrollBarWidth + "px";
};

const enableScroll = () => {
    document.body.style.overflow = "unset";
    document.body.style.marginRight = 0;
};

Portal.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.any,
};

export default Portal;
