import * as Icons from "react-feather";
import React from "react";

export const ActionChip = ({ label, className, onClick }) => {
    return (
        <div
            className={"flex items-center bg-nebula-blue-light text-nebula-blue font-bold px-2 py-1 font-semibold rounded tracking-widest inline text-xs break-all " +
                className}>
            {label.toUpperCase()}
            <div
                id={label}
                className="hover:text-nebula-grey-800"
                onClick={onClick}>
                <Icons.X className="px-1 py-1" />
            </div>
        </div>
    );
};

export default ActionChip;
