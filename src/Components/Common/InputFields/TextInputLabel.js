import React from "react";
import PropTypes from "prop-types";

const TextInputLabel = (props) => {
    let label = null;
    if (props.label) {
        label = (
            <label className="font-semibold text-sm mt-6 ml-1">
                {props.label}
            </label>
        );
    }
    return (
        label 
    );
};

TextInputLabel.propTypes = {
    label: PropTypes.string,
};

export default TextInputLabel;