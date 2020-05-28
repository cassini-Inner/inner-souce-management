import React, { useMemo, useReducer, useContext, useEffect, useState } from "react";
import { GET_USER_SKILLS, GET_ALL_JOBS_FILTER, GET_PAGINATED_JOBS_FILTER } from "../../queries";
import { useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
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
    APPEND_JOBS: "APPEND_JOBS"
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
    case actions.APPEND_JOBS: {
        return {
            ...state,
            jobs: [...state.jobs, ...action.value]
        };
    }
    default:
        return state;
    }
}


export const JobsFeedProvider = (({ children }) => {

    const jobListLimit = 5;
    const [ lastJobCursor, setLastJobCursor ] = useState(null)
    const [ updateJobListType, setUpdateJobListType ] = useState("scroll")

    const { user } = useContext(AuthenticationContext);

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


    const [getJobList, { loading: jobsLoading, data: jobsData }] = useLazyQuery(GET_PAGINATED_JOBS_FILTER, {
        onCompleted: (data) => {
            if (data != null &&  data.Jobs.allJobs != null &&  data.Jobs.allJobs != []) {
                let jobs =  data.Jobs.allJobs.map((value, key) => {
                    if(key == data.Jobs.allJobs.length-1) {
                        setLastJobCursor(value.cursor)
                    }
                    return value.Job
                })
                if(updateJobListType == "scroll") {
                    dispatch({ type: actions.APPEND_JOBS, value: jobs });
                }
                else if(updateJobListType == "filter") {
                    dispatch({ type: actions.UPDATE_JOBS, value: jobs });
                }
            }
        },
        onError: (error) => {
            console.log(error);
        },
        fetchPolicy: "cache-and-network",
    });

    document.addEventListener("DOMContentLoaded", function(event) { 
        let observer = new IntersectionObserver((entries) => alert("hii") , null);
        let target = document.getElementById('scrollObserver');
        observer.observe(target);
      });

    useEffect(
        () => {
            setUpdateJobListType("filter")
            getJobList({
                variables: {
                    filter: {
                        skills: state.skills,
                        status: state.status,
                    },
                    limit: jobListLimit,
                }
            }) 
        },
        [state.skills, state.status]
    );

    // const loadJobList = () => {
    //     setUpdateJobListType("scroll")
    //     getJobList({
    //         variables: {
    //             filter: {
    //                 skills: state.skills,
    //                 status: state.status,
    //             },
    //             limit: jobListLimit,
    //             after: lastJobCursor
    //         }
    //     }) 
    // }

    // window.onscroll = (ev) => {
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //         loadJobList()      
    //     }
    // }; 

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



