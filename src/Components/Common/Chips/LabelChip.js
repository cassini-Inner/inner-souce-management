import React from "react";

export const LabelChip = ({ label, onClick, className }) => {
    return (
        <div
            onClick={onClick}
            className={" bg-nebula-blue-light text-nebula-blue font-bold px-2 py-1 font-semibold rounded tracking-widest inline text-xs " +
                className + (onClick ? " select-none cursor-pointer " : " ")}>
            {label.toUpperCase()}
        </div>
    );
};

export default LabelChip;
