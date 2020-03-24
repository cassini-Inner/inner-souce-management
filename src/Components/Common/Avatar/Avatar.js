import React from "react";
import PropTypes from "prop-types";
const Avatar = (props) => {
    return (
        <img src={props.imagePath} className="h-10 w-10 shadown-inner border-4 border-nebula-blue-light rounded-full" />
    );
};

Avatar.propTypes = {
    imagePath: PropTypes.string,
};

export default Avatar;