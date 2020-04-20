import React from "react";
import PropTypes from "prop-types";

const StickyHeader = (props) => {
    return (
        <div className="sticky top-0 bg-white z-50">
            {props.children}
        </div>
    );
};

StickyHeader.propTypes = {
    children: PropTypes.any,
};

export default StickyHeader;