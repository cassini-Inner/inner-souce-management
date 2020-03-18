import React from "react";

export const InfoTag = (props) => {
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
                <p className="font-semibold leading-tight tracking-widest text-xs text-nebula-grey-600 mb-2">
                    {props.title}
                </p>
            </div>
            <div>
                <p className="leading-tight font-semibold text-sm">
                    {content}
                </p>
            </div>
        </div>
    );
};


