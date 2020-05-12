import React from "react";
import PropTypes from "prop-types";
const ModalContainer = (props) => {
    return (
        <div id="modal" className={"flex w-auto flex-col bg-white pt-6 px-6 z-50 rounded-lg shadow-2xl shadow-lg " + props.className}>
            {props.children}
        </div>
    );
};

ModalContainer.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};

export default ModalContainer;