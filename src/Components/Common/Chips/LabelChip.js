import * as Icons from "react-feather";
import React from "react";

export const LabelChip = (props) => {
    return (
        <div
            className={"flex items-center bg-nebula-blue-light text-nebula-blue font-bold px-2 py-1 font-semibold rounded tracking-widest inline text-xs " +
        props.className}>
            {props.label.toUpperCase()}
        </div>
    );
};

export default LabelChip;
