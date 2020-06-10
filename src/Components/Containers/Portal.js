import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

const Portal = ({isOpen, children, scrim}) => {

    useEffect(()=> {
        setScrollState(isOpen);
        return (()=> {enableScroll();});
    }, [isOpen]);
    return ReactDOM.createPortal(
        <>
            {
                isOpen &&
                      <div>
                          {scrim && <div className="fixed z-40 inset-0 bg-nebula-grey-400 opacity-50"/>}
                          <div className="fixed z-50 mx-auto inset-0">
                              {children}
                          </div>
                      </div>
            }
        </>,
        modalRoot
    );
};

const setScrollState = (isOpen) =>{
    if (isOpen) {disableScroll();}
    else {enableScroll();}
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
