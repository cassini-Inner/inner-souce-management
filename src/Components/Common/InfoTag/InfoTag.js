import React from "react";

const InfoTag = (props) => {
    let content = "";
    let remainingCount = "";
    if (Array.isArray(props.data)) {
        const length = props.data.length - 1;
        const limit = props.limit ? props.limit : props.data.length;
        content = props.data.slice(0, limit).join(", ");
        if (limit != props.data.length) {
            remainingCount = "+ " + (props.data.length - props.limit) + " more";
        }
    } else {
        content = props.data;
    }
    return (
        <div className={props.className}>
            <div>
                <p
                    className="leading-tight tracking-widest text-xs text-nebula-grey-600 mb-1">
                    {props.title.toUpperCase()}
                </p>
            </div>
            <span>
                <span
                    className="font-semibold leading-tight text-sm text-nebula-grey-700">
                    {content}
                    {props.limit && !remainingCount.length==0 &&
              <span className="text-nebula-grey-500">
                  {remainingCount}
              </span>
                    }
                </span>
            </span>
        </div>
    );
};

export default InfoTag;


