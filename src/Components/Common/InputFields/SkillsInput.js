import { useRef, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SKILLS_SUGGESTIONS } from "../../../queries";
import React from "react";
import TextInput from "./TextInput";
import LabelChip from "../Chips/LabelChip";
import ActionChip from "../Chips/ActionChip";

export const SkillsInput = ({ skills, addSkill, removeSkill, reset, skillAddCallback, label }) => {
    const inputRef = useRef();
    const [skillSuggestions, setSkillSuggestions] = useState([]);
    const [typingTimeOut, setTypingTimeOut] = useState();
    const [getSkillsSuggestions, { error }] = useLazyQuery(
        GET_SKILLS_SUGGESTIONS,
        {
            onCompleted: (data) => {
                const skillValues = (data.Skills.map((skill) => { return skill.value; }));
                console.log(skillValues);
                if (inputRef.current.value !== "") {
                    setSkillSuggestions(skillValues);
                }
            }
        }
    );

    useEffect(
        () => {
            if (skillAddCallback) {
                skillAddCallback(skills);
            }
        }, [skills]
    );

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            addSkillToList(e.target.value);
        }
    };

    const addSkillToList = (value) => {
        addSkill(value);
    };



    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setSkillSuggestions([]);
            return;
        }
        if (typingTimeOut) {
            clearTimeout(typingTimeOut);
        }

        setTypingTimeOut(setTimeout(() => {
            console.log("timed out");
            getSkillsSuggestions({ variables: { query: value } });
        }, 500));
    };

    return (
        <div
            className="flex flex-col space-y-2"
        >
            <TextInput
                label={label}
                onKeyDown={(e) => { handleKeyDown(e); }}
                onChange={(e) => { handleChange(e); }}
                forwardedRef={inputRef}
            />
            <div className="flex flex-row flex-wrap items-center">
                {
                    skillSuggestions.length > 0 &&

                    <p className="text-sm text-nebula-grey-600 mr-4">Suggestions</p>
                }
                {
                    skillSuggestions.slice(0, 3).map((skill, key) => {
                        return <LabelChip
                            key={skill}
                            label={skill}
                            className="my-2 mr-2"
                            onClick={() => {
                                addSkillToList(skill);
                            }}
                        />;
                    })
                }
            </div>
            <div className="flex flex-row flex-wrap">
                {
                    skills.map((skill, key) => {
                        return <ActionChip
                            key={key}
                            label={skill}
                            className="mb-2 mr-2"
                            onClick={() => { removeSkill(skill); }}
                        />;
                    })
                }
            </div>

        </div>
    );
};