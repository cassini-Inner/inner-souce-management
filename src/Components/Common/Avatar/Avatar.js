import React from "react";
import PropTypes from "prop-types";
const   Avatar = (props) => {
    return (
        <img src={props.imagePath} className={"h-6 w-6 shadown-inner border-4 border-nebula-blue-light rounded-full " + props.className} />
    );
};

Avatar.propTypes = {
    imagePath: PropTypes.string,
    className: PropTypes.string
};

export default Avatar;
