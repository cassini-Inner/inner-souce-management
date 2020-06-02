import React, { useState } from "react";
import TextInput from "./TextInput";
import ActionChip from "../Chips/ActionChip";
import TextInputLabel from "./TextInputLabel";
import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";
import { GET_SKILLS_SUGGESTIONS } from "../../../queries";
import LabelChip from "../Chips/LabelChip";

const SearchTagsInput = (props) => {

    const [state, setState] = useState({
        tagList: props.initialList || [],
        input: "",
    });

    const [typingTimeOut, setTypingTimeOut] = useState();

    const [skillSuggestions, setSkillSuggestions] = useState([]);

    const [getSkillsSuggestions, { error }] = useLazyQuery(
        GET_SKILLS_SUGGESTIONS,
        {
            onCompleted: (data) => {
                const skillValues = (data.Skills.map((skill) => { return skill.value; })).slice(0, 4);
                setSkillSuggestions(skillValues);
            }
        }
    );

    const addTag = (value) => {
        const tagList = [...state.tagList, value];
        setState({
            tagList: tagList,
            input: "",
        });

        //For the parent component to get the tag list 
        if (props.getTagList) {
            props.getTagList(tagList);
        }
    };


    const onKeyDown = (event) => {
        state.input = event.target.value.toLowerCase();
        if (event.key === "Enter" && state.input.trim() !== "" && !state.tagList.includes(state.input)) {
            const tagList = [...state.tagList, state.input];
            setState({
                tagList: tagList,
                input: "",
            });
            event.target.value = "";

            //For the parent component to get the tag list 
            if (props.getTagList) {
                props.getTagList(tagList);
            }
        }
    };


    const removeTag = (event) => {
        let temp = [...state.tagList];
        temp.splice(temp.indexOf(event.currentTarget.id), 1);
        setState({
            tagList: temp,
            input: state.input,
        });
        if (props.getTagList) {
            props.getTagList(temp);
        }
    };

    const onChange = (event) => {
        const value = event.target.value;
        if (typingTimeOut) {
            clearTimeout(typingTimeOut);
        }

        setTypingTimeOut(setTimeout(() => {
            getSkillsSuggestions({ variables: { query: value } });
        }, 300));
    };

    return (
        <div className={props.className}>
            <TextInput
                className="w-full mb-2 "
                placeholder={props.placeholder}
                onKeyDown={onKeyDown}
                onChange={onChange}
                label={props.label}
            />
            <div className="flex flex-row flex-wrap items-center" >
                {skillSuggestions && skillSuggestions.length > 0 &&
                    <p className="text-xs pr-4 text-nebula-grey-600">Suggestions</p>
                }
                {
                    skillSuggestions.map((tag, index) => {
                        return (
                            <LabelChip
                                key={tag}
                                id={tag}
                                label={tag}
                                onClick={addTag}
                                className="m-1 ml-0"
                            />
                        );
                    })
                }
            </div>
            <div className="flex flex-row flex-wrap" >
                {
                    state.tagList.map((tag, index) => {
                        return (
                            <ActionChip
                                key={tag}
                                id={tag}
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
