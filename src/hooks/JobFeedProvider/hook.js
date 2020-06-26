import { useContext, useEffect, useReducer } from "react";
import { AuthenticationContext } from "../useAuthentication/provider";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_JOBS_FILTER } from "../../queries";

var initialState;
const jobsPageLimit = 5;
export const actions = {
        ADD_SKILL: "ADD_SKILL",
        ADD_STATUS: "ADD_STATUS",
        UPDATE_JOBS: "UPDATE_JOBS",
        RESET_JOBS: "RESET_JOBS",
        REMOVE_SKILL: "REMOVE_SKILL",
        REMOVE_STATUS: "REMOVE_STATUS",
        INIT_SKILLS: "INIT_SKILLS",
        RESET: "RESET",
    },
    jobStatuses = {
        OPEN: "OPEN",
        ONGOING: "ONGOING",
        COMPLETED: "COMPLETED",
    };

function reducer (state, action) {
    switch (action.type) {
    case actions.ADD_SKILL: {
        const newSkills = [...state.skills];
        if (!state.skills.includes(action.value)) {
            newSkills.push(action.value.toLowerCase());
        }
        return {
            ...state,
            skills: newSkills,
        };
    }
    case actions.REMOVE_SKILL: {
        const newSkills =
              state.skills.includes(action.value.toLowerCase())
                  ? state.skills.filter(skill => skill !== action.value)
                  : state.skills;
        return {
            ...state,
            skills: newSkills,
        };
    }
    case actions.ADD_STATUS: {
        const newStatus = [...state.status];
        if (!state.status.includes(action.value.toUpperCase())) {
            newStatus.push(action.value.toUpperCase());
        }
        return {
            ...state,
            status: newStatus,
        };
    }
    case actions.REMOVE_STATUS: {
        const newStatus =
              state.status.filter(
                  status => status !== action.value.toUpperCase());
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
            status: ["OPEN", "ONGOING"],
        };
    }
    case actions.RESET: {
        return {
            ...action.value
        };
    }
    case actions.UPDATE_JOBS: {
        const {jobs,hasNextPage, after} = action.value;
        return {
            ...state,
            jobData: {
                jobs: [...state.jobData.jobs, ...jobs],
                hasNextPage,
                after,
            },
        };
    }
    case actions.RESET_JOBS: {
        return {
            ...state,
            jobData: {
                jobs: [],
                hasNextPage: true,
                after: null,
            }
        };
    }
    default:
        return state;
    }
}

export function useJobsFeed () {
    const { user } = useContext(AuthenticationContext);
    const [{ skills, status, jobData }, dispatch] = useReducer(
        reducer,
        {
            skills: user.skills != null
                ? user.skills.map(({ value }) => value)
                : [],
            status: ["OPEN", "ONGOING"],
            jobData: {
                jobs: [],
                after: null,
                hasNextPage: true,
            },
        },
    );

    const [getAllJobs, { loading }] = useLazyQuery(
        GET_ALL_JOBS_FILTER, {
            variables: {
                filter: {
                    skills: skills,
                    status: status,
                },
                limit: jobsPageLimit,
            },
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                if (data != null) {
                    // const jobs = data.Jobs != null ? data.Jobs.edges.map(edge => {edge.node;}) : [];
                    // dispatch({ type: actions.UPDATE_JOBS, value: jobs });
                    const fetchedJobs = data.Jobs ? data.Jobs.edges.map(
                        (edge) => edge.node) : [];
                    dispatch({
                        type: actions.UPDATE_JOBS,
                        value: {
                            jobs: fetchedJobs,
                            hasNextPage: data.Jobs.pageInfo.hasNextPage,
                            after: data.Jobs.pageInfo.endCursor,
                        },
                    });
                }
            },
            onError: (error) => {
                console.log(error);
            },
        },
    );

    useEffect(() => {
        dispatch({type:actions.RESET_JOBS});
        getAllJobs();
        return (() => {});
    }, [skills, status]);

    const addSkill = (value) => {
        dispatch({
            type: actions.ADD_SKILL,
            value: value,
        });
    };
    const removeSkill = (value) => {
        dispatch({
            type: actions.REMOVE_SKILL,
            value: value,
        });
    };
    const addStatus = (value) => {
        dispatch({
            type: actions.ADD_STATUS,
            value: value,
        });
    };
    const removeStatus = (value) => {
        dispatch({
            type: actions.REMOVE_STATUS,
            value: value,
        });
    };
    const loadMoreJobs = () => {
        getAllJobs({
            variables: {
                filters: {
                    skills: skills,
                    status: status,
                },
                limit: jobsPageLimit,
                after: jobData.after,
            }
        });
    };

    const resetFilter = () => {
        dispatch({type: actions.RESET, value:{
            skills: user.skills != null
                ? user.skills.map(({ value }) => value)
                : [],
            status: ["OPEN", "ONGOING"],
            jobData: {
                jobs: [],
                after: null,
                hasNextPage: true,
            },
        }
        });
    };

    return {
        skills,
        jobData,
        status,
        loading,
        addSkill,
        removeSkill,
        addStatus,
        removeStatus,
        loadMoreJobs,
        resetFilter,
    };
}
