import React from "react";

const Button = (props) => {
    switch (props.type) {
    case "primary":
        return (
            <button
                className={"rounded w-auto select-none font-semibold px-4 py-2 text-center bg-nebula-blue text-white transition duration-150 shadow-none hover:shadow-lg text-sm h-12 " +
                props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    case "secondary":
        return (
            <button
                className={"rounded w-auto select-none font-semibold px-4 py-2 text-center bg-nebula-blue-light transition duration-150 shadow-none hover:shadow-lg text-nebula-blue border-2 border-nebula-blue text-sm h-12 " +
              props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    case "error":
        return (
            <button
                className={"rounded w-auto select-none font-semibold px-4 py-2 text-center bg-nebula-red-light transition duration-150 shadow-none hover:shadow-lg text-nebula-red border-2 border-nebula-red text-sm h-12 " +
              props.className}
                onClick={props.onClick}>
                {props.label}
            </button>
        );
    default:
        return (
            <button
                className={"rounded w-auto select-none font-semibold px-4 py-2 text-center bg-nebula-blue text-white text-sm " +
              props.className}>
                {props.label}
            </button>
        );
    }
};

export default Button;
