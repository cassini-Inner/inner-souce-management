import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const SidebarItem = (props) => {
    const selectedClasses = " text-sm text-nebula-blue bg-nebula-blue-light border-nebula-blue ";
    const unselectedClasses = "flex flex-row items-center text-nebula-grey-600 text-sm h-12 my-4 font-semibold border-l-4 border-transparent ";

    return <NavLink
        exact={props.exactLink}
        to={props.location}
        activeClassName={selectedClasses}
        className={unselectedClasses}
        onClick={props.onClick}
    >
        <div className="ml-6">
            {props.icon}
        </div>
        <div className="ml-10 whitespace-no-wrap ">{props.label}</div>
    </NavLink>;
};

SidebarItem.propTypes = {
    location: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    label: PropTypes.string,
    exactLink: PropTypes.bool
};

export default SidebarItem;
