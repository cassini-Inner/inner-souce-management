import React from "react";
import PropTypes from "prop-types";

const ModalViewWithScrim = (props) => {
    return (
        <div className="fixed inset-0 flex justify-center z-40">
            <div className = "fixed inset-0 bg-black opacity-25 z-40" />
            <div className=" overflow-y-auto h-full w-full z-50">
                <div className=" mx-auto max-w-3xl py-12 px-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

ModalViewWithScrim.propTypes = {
    children: PropTypes.any,
};

export default ModalViewWithScrim;
