import React, { useState } from "react";
import TextInput from "./TextInput";
import ActionChip from "../Chips/ActionChip";
import TextInputLabel from "./TextInputLabel";
import PropTypes from "prop-types";

const SearchTagsInput = (props) => {

    const [state, setState] = useState({
        tagList: props.initialList || [],
        input: "",
    });

    const addTag = (event) => {
        state.input = event.target.value;
        if (event.key === "Enter" && state.input.trim() !== "") {
            setState({
                tagList: [...state.tagList, state.input],
                input: "",
            });
            event.target.value = "";
        }
        //For the parent component to get the tag list 
        if(props.getTagList) {
            props.getTagList( [...state.tagList, state.input]);
        }
    };


    const removeTag = (event) => {
        let temp = [...state.tagList];
        temp.splice(temp.indexOf(event.currentTarget.id), 1);
        setState({
            tagList: temp,
            input: state.input,
        });
    };

    return (
        <div className={props.className}>
            <TextInputLabel label={props.label}/>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TextInput
                className="w-full mb-2 "
                placeholder={props.placeholder}
                onKeyDown={addTag}
            />
            <div className="flex flex-row flex-wrap" >
                {
                    state.tagList.map((tag, index) => {
                        return (
                            <ActionChip
                                key={tag}
                                id={index}
                                label={tag}
                                onClick={removeTag}
                                className="m-1 ml-0"
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

SearchTagsInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    initialList: PropTypes.array,
};

export default SearchTagsInput;
