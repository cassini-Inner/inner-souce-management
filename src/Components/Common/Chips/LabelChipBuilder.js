import React from "react";
import LabelChip from "./LabelChip";

const LabelChipBuilder = (props) => {
    return (
        <div className="flex flex-row flex-wrap">
            {
                props.labels.map(
                    (label, index) => {
                        return (<LabelChip label={label} key={index} className="mr-2"></LabelChip>);
                    }
                )
            }
        </div>
    );
};

export default LabelChipBuilder;