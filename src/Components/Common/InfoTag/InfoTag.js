import React from "react";

const InfoTag = (props) => {
    let content = "";
    if (Array.isArray(props.data)) {
        const length = props.data.length - 1;
        for (let [index, value] of props.data.entries()) {
            content += value + (index < length ? ", " : "");
        }
    } else {
        content = props.data;
    }
    return (
        <div className={props.className}>
            <div>
                <p className=" leading-tight tracking-widest text-xs text-nebula-grey-600 mb-1">
                    {props.title.toUpperCase()}
                </p>
            </div>
            <div>
                <p className="font-semibold leading-tight text-sm">
                    {content}
                </p>
            </div>
        </div>
    );
};

export default InfoTag;


