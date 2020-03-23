import React, { useState } from "react";
import TextInput from "./TextInput";
import ActionChip from "../Chips/ActionChip";

const SearchTagsInput = (props) => {
    const [state, setState] = useState({
        tagList: [],
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TextInput className="w-full" placeholder={props.placeholder}
                onKeyDown={addTag}/>
            <div className="flex flex-row flex-wrap">
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

export default SearchTagsInput;
