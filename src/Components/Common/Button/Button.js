import React from "react";

const Button = ({type, className, onClick, label, id}) => {
    const commonStyle = " text-sm whitespace-no-wrap h-10 rounded w-auto select-none font-semibold px-8 py-2 text-center transition duration-150 shadow-none hover:shadow-xl focus:shadow-xl  ";

    switch (type) {
    case "primary":
        return (
            <button
                id={id?id:null}
                className={commonStyle + "bg-nebula-blue text-white " +
                className}
                onClick={onClick}
            >
                {label}
            </button>
        );
    case "secondary":
        return (
            <button
                id={id?id:null}
                className={commonStyle + "bg-nebula-blue-light transition duration-150 shadow-none hover:shadow-lg text-nebula-blue border-2 border-nebula-blue  " +
                className}
                onClick={onClick}>
                {label}
            </button>
        );
    case "error":
        return (
            <button
                id={id?id:null}
                className={commonStyle + "bg-nebula-red-light transition duration-150 shadow-none hover:shadow-lg text-nebula-red border-2 border-nebula-red " +
                className}
                onClick={onClick}>
                {label}
            </button>
        );
    case "submit":
        return (
            <button
                id={id?id:null}
                type="submit"
                className={commonStyle + "bg-nebula-blue text-white " +
                className}
                onClick={onClick}>
                {label}
            </button>
        );
    default:
        return (
            <button
                id={id?id:null}
                className={commonStyle + "bg-nebula-blue text-white text-sm " +
                className}
                onClick={onClick}>
                {label}
            </button>
        );
    }
};

export default Button;
