import * as Icons from "react-feather";
import React from "react";

export const LabelChip = (props) => {
    return (
        <div
            className={"flex items-center bg-nebula-blue-light text-nebula-blue font-semibold px-2 py-1 font-semibold rounded tracking-widest inline text-xs " +
        props.className}>
            {props.label.toUpperCase()}
            <div
                id={props.label}
                className="hover:text-nebula-grey-800"
                onClick={props.onClick}>
                <Icons.X className="px-1 py-1"/>
            </div>
        </div>
    );
};

export default LabelChip;
