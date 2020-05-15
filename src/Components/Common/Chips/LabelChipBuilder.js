import React from "react";
import LabelChip from "./LabelChip";

const LabelChipBuilder = ({ labels, onClick }) => {
    if (!labels) {
        return <></>;
    }
    return (
        <div className="flex flex-row flex-wrap">
            {labels &&
                labels.map(
                    (label, index) => {
                        return (
                            <LabelChip
                                label={label}
                                key={index}
                                className="my-1 mr-2"
                                onClick={onClick}
                            />
                        );
                    }
                )
            }
        </div>
    );
};

export default LabelChipBuilder;