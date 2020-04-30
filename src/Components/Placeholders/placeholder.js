import React from "react";
import Button from "../Common/Button/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Placeholder = (props) => {
    return <div className="grid grid-cols-5 h-auto bg-nebula-blue-light my-4 rounded-lg select-none">
        <div className="col-span-3 flex flex-col justify-center  p-8 ">
            <div>
                <h2 className="text-2xl text-nebula-blue font-semibold">{props.heading}</h2>
                <h3 className="text-md text-nebula-blue font-semibold mt-4 opacity-75">{props.body}</h3>
            </div>
            <div className="mt-12">
                <Link to={props.linkLocation}>
                    <Button
                        type="primary"
                        label={props.buttonLabel}
                        onClick={props.onClick}
                    />
                </Link>
            </div>
        </div>
        <div className="col-span-2">
            <img src={props.image} className="object-center w-full"/>
        </div>
    </div>;
};
Placeholder.propTypes = {
    heading: PropTypes.string ,
    body: PropTypes.string,
    buttonLabel: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    linkLocation: PropTypes.string
};

export default Placeholder;
