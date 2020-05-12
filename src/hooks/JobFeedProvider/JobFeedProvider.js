import React, { useMemo, useReducer, useContext } from "react";
import { GET_USER_SKILLS, GET_ALL_JOBS_FILTER } from "../../queries";
import { useQuery } from "@apollo/client";
import { AuthenticationContext } from "../useAuthentication/provider";

export const JobsFeedContext = React.createContext();

var initialState;

export const actions = {
    ADD_SKILL: "ADD_SKILL",
    UPDATE_JOBS: "UPDATE_JOBS",
    REMOVE_SKILL: "REMOVE_SKILL",
    ADD_STATUS: "ADD_STATUS",
    REMOVE_STATUS: "REMOVE_STATUS",
    INIT_SKILLS: "INIT_SKILLS",
    RESET: "RESET",
};

export const jobStatuses = {
    OPEN: "OPEN",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
};

function reducer(state, action) {
    switch (action.type) {
        case actions.ADD_SKILL: {
            const newSkills = [...state.skills];
            if (!state.skills.includes(action.value))
                newSkills.push(action.value.toLowerCase());
            return {
                ...state,
                skills: newSkills,
            };
        }
        case actions.REMOVE_SKILL: {
            const newSkills =
                state.skills.includes(action.value.toLowerCase())
                    ? state.skills.filter(skill => skill != action.value)
                    : state.skills;
            return {
                ...state,
                skills: newSkills,
            };
        }
        case actions.ADD_STATUS: {
            const newStatus = [...state.status];
            if (!state.status.includes(action.value.toUpperCase()))
                newStatus.push(action.value.toUpperCase());
            return {
                ...state,
                status: newStatus,
            };
        }
        case actions.REMOVE_STATUS: {
            const newStatus =
                state.status.filter(
                    status => status != action.value.toUpperCase());
            return {
                ...state,
                status: newStatus,
            };

        }
        case actions.INIT_SKILLS: {
            const skills = [...action.value];
            return {
                ...state,
                skills: skills,
                status: ["OPEN", "ONGOING"]
            };
        }
        case actions.RESET: {
            return {
                ...state,
                ...initialState,
            };
        }
        case actions.UPDATE_JOBS: {
            return {
                ...state,
                jobs: action.value
            };
        }
        default:
            return state;
    }
}


export const JobsFeedProvider = (({ children }) => {

    const { user } = useContext(AuthenticationContext);
    console.log("jobs feed provider, user: ", user);

    console.log("job feed");
    const [state, dispatch] = useReducer(reducer, { skills: user.skills != null ? user.skills.map(({ value }) => value) : [], status: [], jobs: [] });

    const { loading, error, data } = useQuery(GET_USER_SKILLS, {
        variables: { userId: user.id },
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
            if (data.User.skills) {
                const skills = data.User.skills.map(skill => skill.value);
                initialState = {
                    status: ["OPEN", "ONGOING"],
                    skills: skills,
                };
                dispatch({ type: actions.INIT_SKILLS, value: skills });
            }
        }
    });

    const { loading: jobsLoading, data: jobsData } = useQuery(
        GET_ALL_JOBS_FILTER, {
        variables: {
            filter: {
                skills: state.skills,
                status: state.status,
            }
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data != null) {
                const jobs = data.allJobs != null ? data.allJobs : [];
                dispatch({ type: actions.UPDATE_JOBS, value: data.allJobs });
            }
        },
        onError: (error) => {
            console.log(error);
        }
    }
    );

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);


    if (loading) {
        return "loading";
    }
    if (error) {
        return "error";
    }

    return <JobsFeedContext.Provider value={contextValue}>
        {children}
    </JobsFeedContext.Provider>;
});



