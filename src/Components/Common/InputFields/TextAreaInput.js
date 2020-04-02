import React, { Fragment } from "react";
import TextInput from "./TextInput";
import PropTypes from "prop-types";
import TextInputLabel from "./TextInputLabel";

const TextAreaInput = (props) => {
    return (
        <Fragment>
            <TextInputLabel label={props.label}/>
            <textarea
                type="text"
                rows={props.rows ? props.rows : "5"}
                cols={props.cols ? props.cols : "50"}
                className={"pl-1 mt-2 text-sm outline-none border-b-2 transition duration-300 focus:border-nebula-grey-600 placeholder-nebula-grey-500  " +
                props.className}
                placeholder={props.placeholder}
                onChange={props.onChange ? props.onChange : null}
                onKeyDown={props.onKeyDown ? props.onKeyDown : null}
                value = {props.value ? props.value : null }
            />
        </Fragment>
    );
};

TextAreaInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    onKeyDown: PropTypes.func,
    rows: PropTypes.string,
    cols: PropTypes.string,
};

export default TextAreaInput;