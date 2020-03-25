import React from "react";
import PropTypes from "prop-types";
const ModalContainer = (props) => {
    return (
        <div id="modal" className="flex flex-col bg-white pt-6 px-6 z-50 rounded-lg shadow-2xl shadow-lg">
            {props.children}
        </div>
    );
};

ModalContainer.propTypes = {
    children: PropTypes.any,
};

export default ModalContainer;