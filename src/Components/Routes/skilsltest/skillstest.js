import React, { useReducer, useRef, useState, useEffect } from "react";
import TextInput from "../../Common/InputFields/TextInput";
import ActionChip from "../../Common/Chips/ActionChip";
import { useSkills } from "../../../hooks/useSkills/hook";
import { useLazyQuery } from "@apollo/client";
import { GET_SKILLS_SUGGESTIONS } from "../../../queries";
import LabelChip from "../../Common/Chips/LabelChip";
export const SkillsTest = () => {
    const { skills, addSkill, removeSkill, reset } = useSkills();
    return (
        <>
            <SkillsDisplay skills={skills} />
            <SkillsInput skills={skills} addSkill={addSkill} removeSkill={removeSkill} reset={reset} />
        </>
    );
};

const SkillsDisplay = ({ skills }) => {
    return (
        <ul>
            {skills.map((skill, key) => {
                return (
                    <li key={key}>
                        {skill}
                    </li>
                );
            })}
        </ul>
    );
};

const SkillsInput = ({ skills, addSkill, removeSkill, reset }) => {
    const inputRef = useRef();
    const [skillSuggestions, setSkillSuggestions] = useState([]);
    const [typingTimeOut, setTypingTimeOut] = useState();
    const [getSkillsSuggestions, { error }] = useLazyQuery(
        GET_SKILLS_SUGGESTIONS,
        {
            onCompleted: (data) => {
                const skillValues = (data.Skills.map((skill) => { return skill.value; }));
                console.log(skillValues);
                setSkillSuggestions(skillValues);
            }
        }
    );

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            addSkill(e.target.value);
            inputRef.current.value = "";
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
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
            className="flex flex-col space-y-4"
        >
            <TextInput
                label="Type yo skills"
                onKeyDown={(e) => { handleKeyDown(e); }}
                onChange={(e) => { handleChange(e); }}
                forwardedRef={inputRef}
            />
            <div className="flex flex-row space-x-2">
                {
                    skillSuggestions.slice(0, 3).map((skill, key) => {
                        return <FadeInElement
                            key={key}>
                            <LabelChip
                                label={skill}
                                className=""
                                onClick={() => { addSkill(skill); }}
                            />
                        </FadeInElement>;
                    })
                }
            </div>
            <div className="flex flex-row space-x-2">
                {
                    skills.map((skill, key) => {
                        return <ActionChip
                            key={key}
                            label={skill}
                            className=""
                            onClick={() => { removeSkill(skill); }}
                        />;
                    })
                }
            </div>

        </div>
    );
};