import React from "react";
import ReactDOM from "react-dom";
import FilterModal from "../Modals/FilterModal";
import MilestoneModal from "../Modals/MilestoneModal";

const modalRoot = document.getElementById("modal-root");
const appRoot = document.getElementById("App");

const ModalContainer = (props) => {

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
                <div className=" overflow-y-auto mt-8 max-w-3xl mx-auto z-50">
                    { modal }
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
    document.body.style.overflow = "hidden";
};

const enableScroll = () => {
    document.body.style.overflow = "unset";
};


export default ModalContainer;
