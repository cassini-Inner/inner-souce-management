import React from "react";
import TextInput from "./TextInput";

const TextAreaInput = (props) => {
    return (
        <textarea type="text" rows={props.rows ? props.rows : "5"}
            cols={props.cols ? props.cols : "50"}
            className={"pl-1 h-12 outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 placeholder-nebula-grey-500  " +
                props.className}
            placeholder={props.placeholder}
            onKeyDown={props.onKeyDown ? props.onKeyDown : null}/>
    );
};

export default TextInput;