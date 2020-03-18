import React from "react";

const TextInput = (props) => {
    return (
        <input
            type="text"
            className={"pl-1 h-12 outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 placeholder-nebula-grey-500 " +
        props.className}
            placeholder={props.placeholder}
            onKeyDown={props.onKeyDown ? props.onKeyDown : null}
        />
    );
};

export default TextInput;
