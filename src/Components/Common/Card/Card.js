import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
    return (
        <div className={"rounded-lg border border-nebula-grey-400 w-full px-4 py-4" + (props.isInteractive ? " hover:shadow-lg transition duration-200 ease-in-out" : "")}>
            {props.children}
        </div>
    );
};

Card.propTypes = {
    isInteractive: PropTypes.bool,
    children: PropTypes.element,
};

export default Card;
