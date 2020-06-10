import React from "react";
import PropTypes from "prop-types";

const ModalViewWithScrim = ({children}) => {
    return (
        <div className="fixed inset-0 flex justify-center z-40"  >
            <div className = "fixed inset-0 bg-white opacity-75 z-40"/>
            <div className=" overflow-y-auto h-full w-full z-50">
                <div className=" mx-auto max-w-3xl py-12 px-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

ModalViewWithScrim.propTypes = {
    children: PropTypes.any,
    close: PropTypes.func,
};

export default ModalViewWithScrim;
