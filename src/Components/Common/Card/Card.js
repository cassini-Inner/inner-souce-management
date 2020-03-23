import React from "react";

const Card = (props) => {
    return (
        <div className="rounded-lg border border-nebula-grey-400 w-full px-4 py-4 hover:shadow-lg transition duration-200 ease-in-out">
            {props.children}
        </div>
    );
};

export default Card;