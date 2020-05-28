import React, { useMemo, useReducer, useContext, useEffect, useState } from "react";
import { GET_USER_SKILLS, GET_ALL_JOBS_FILTER, GET_PAGINATED_JOBS_FILTER } from "../../queries";
import { useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { AuthenticationContext } from "../useAuthentication/provider";
import { useJobsFeed } from "./hook";

export const JobsFeedContext = React.createContext();
export const JobsFeedProvider = (({ children }) => {
    const jobFeedData = useJobsFeed();

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
        return jobFeedData;
    }, [jobFeedData]);

    console.log(jobFeedData);
    return <JobsFeedContext.Provider value={contextValue}>
        {children}
    </JobsFeedContext.Provider>;
});



