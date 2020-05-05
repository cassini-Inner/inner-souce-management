import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextInputLabel from "./TextInputLabel";

const TextInput = (props) => {
    return (
        <div className="flex flex-col">
            <TextInputLabel label={props.label} />
            <input
                ref={props.forwardedRef}
                id={props.id ? props.id : ""}
                type={props.number ? "number" : "text"}
                min={props.min ? props.min : ""}
                className={"pl-1 h-8 text-sm  outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 placeholder-nebula-grey-500 " +
                    props.className}
                placeholder={props.placeholder}
                onChange={props.onChange ? props.onChange : null}
                value={props.value ? props.value : undefined}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}

            />
        </div>
    );
};

TextInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyDown: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextInput;
