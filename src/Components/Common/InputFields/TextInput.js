import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextInputLabel from "./TextInputLabel";

const TextInput = (props) => {
    return (
        <Fragment>
            <TextInputLabel label={props.label}/>
            <input
                type="text"
                className={"pl-1 h-12 outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 placeholder-nebula-grey-500 " +
            props.className}
                placeholder={props.placeholder}
                onChange={props.onChange ? props.onChange : null}
                value={props.value ? props.value : undefined}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}
            />
        </Fragment>
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
