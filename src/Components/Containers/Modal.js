import React, { useState } from "react";
import { connect } from "react-redux";
import FilterModal from "../Modals/FilterModal";
import MilestoneModal from "../Modals/MilestoneModal";
import * as actionType from "../../Store/actions";

const ModalContainer = (props) => {

    const [state, setState] = useState(props.modalState.modal);
    let modal = "";
    if(props.modalState.modal.type === "filter")
        modal =  <FilterModal {...props} />;
    if(props.modalState.modal.type === "milestone")
        modal =  <MilestoneModal {...props} />;

    if (props.modalState.modal.display) {
        disableScroll();
        return (
            <div className="fixed w-screen h-screen flex justify-center items-center z-50">
                <div className="w-full h-full fixed bg-black opacity-25"></div>
                { modal }
            </div>
        );
    }
    else {
        enableScroll();
        return ("");
    }
};

const disableScroll = () => {
    let name = "overflow-y-hidden";
    let arr = document.body.className.split(" ");
    document.body.className += " " + name;
};

const enableScroll = () => {
    let name = "overflow-y-hidden";
    let arr = document.body.className.split(" ");
    arr[arr.indexOf(name)] = "overflow-y-scroll";
    document.body.className = arr.join("");
};

const mapStateToProps = state => {
    return {
        modalState: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch({ type: actionType.CLOSE_MODAL })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
