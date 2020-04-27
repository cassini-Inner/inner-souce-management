import React from "react";

const Dropdown = (props) => {
    const dropdownList = props.list.map((label) => {
        return (
            <option value={label}>{label}</option>
        );
    });

    return (
        <div className="flex flex-wrap w-auto">
            <div className="p-2">
                {
                    props.title ?
                        <div className="flex text-base">
                            {props.title}
                        </div>
                        : ""
                }
                <select id={props.id}
                    onChange = {props.onChange ? props.onChange : null}
                    className={"transition duration-150 rounded border border-2 border-nebula-grey-400 outline-none p-2 leading-tight hover:shadow-inner " + (props.className?props.className:"")} >
                    {dropdownList}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
