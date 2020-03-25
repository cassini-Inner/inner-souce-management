import React from "react";
import ReactDOM from "react-dom";
import FilterModal from "../Modals/FilterModal";
import MilestoneModal from "../Modals/MilestoneModal";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {

    let modal = "";
    if(props.modalType === "filter")
        modal =  <FilterModal {...props} />;
    if(props.modalType === "milestone")
        modal =  <MilestoneModal {...props} />;

    if (props.modalDisplay) {
        disableScroll();
        return ReactDOM.createPortal(
            <div className="fixed inset-0 flex justify-center z-40">
                <div className = "fixed inset-0 bg-black opacity-25 z-40" />
                <div className=" overflow-y-auto h-full w-full z-50">
                    <div className=" mx-auto max-w-3xl py-12 px-4">
                        { modal }
                    </div>
                </div>
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
    console.log(scrollBarWidth);
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = scrollBarWidth + "px";
};

const enableScroll = () => {
    document.body.style.overflow = "unset";
    document.body.style.marginRight = 0;
};


export default Modal;
