import { useReducer } from "react";

const actions = {
    ADD_SKILL: "ADD_SKILL",
    REMOVE_SKILL: "REMOVE_SKILL",
    RESET: "RESET",
};

const reducer = (skills, { type, value }) => {
    let newSkills = [...skills];
    switch (type) {
    case actions.ADD_SKILL: {
        if (!newSkills.includes(value)) { newSkills.push(value); }
        return newSkills;
    }
    case actions.REMOVE_SKILL: {
        if (newSkills.includes(value)) { newSkills = newSkills.filter((item) => { if (item != value) return item; }); }
        return newSkills;
    }
    case actions.RESET: {
        return [];
    }
    default:
        throw new Error("an action must be provided");
    }
};


export function useSkills(initialSkills) {
    const [skills, dispatch] = useReducer(reducer, initialSkills ? initialSkills : []);

    const addSkill = (value) => {
        dispatch({ type: actions.ADD_SKILL, value: value });
    };

    const removeSkill = (value) => {
        dispatch({ type: actions.REMOVE_SKILL, value: value });
    };

    const reset = () => {
        dispatch({ type: actions.RESET });
    };

    return {
        skills,
        addSkill,
        removeSkill,
        reset,
    };
}
