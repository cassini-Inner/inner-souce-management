import React from "react";
import ReactDOM from "react-dom";
import FilterModal from "../Modals/FilterModal";
import MilestoneModal from "../Modals/MilestoneModal";

const modalRoot = document.getElementById("modal-root");

const ModalContainer = (props) => {

    let modal = "";
    if(props.modalType === "filter")
        modal =  <FilterModal {...props} />;
    if(props.modalType === "milestone")
        modal =  <MilestoneModal {...props} />;

    if (props.modalDisplay) {
        disableScroll();
        return ReactDOM.createPortal(
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center z-40">
                <div className = "fixed bg-black opacity-25 z-40 w-full h-full top-0 right-0" />
                { modal }
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
    let name = "overflow-y-hidden";
    document.body.className += " " + name;
};

const enableScroll = () => {
    let name = "overflow-y-hidden";
    let arr = document.body.className.split(" ");
    arr[arr.indexOf(name)] = "overflow-y-scroll";
    document.body.className = arr.join("");
};


export default ModalContainer;
