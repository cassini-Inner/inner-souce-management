import React from "react";

const Button = (props) => {
    const commonStyle = " text-sm whitespace-no-wrap h-10 rounded w-auto select-none font-semibold px-8 py-2 text-center transition duration-150 shadow-none hover:shadow-lg  ";

    switch (props.type) {
    case "primary":
        return (
            <button
                className={commonStyle + "bg-nebula-blue text-white " +
                props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    case "secondary":
        return (
            <button
                className={commonStyle + "bg-nebula-blue-light transition duration-150 shadow-none hover:shadow-lg text-nebula-blue border-2 border-nebula-blue " +
                props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    case "error":
        return (
            <button
                className={commonStyle + "bg-nebula-red-light transition duration-150 shadow-none hover:shadow-lg text-nebula-red border-2 border-nebula-red " +
                props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    default:
        return (
            <button
                className={commonStyle + "bg-nebula-blue text-white text-sm " +
                props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    }
};

export default Button;
