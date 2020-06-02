import React, { useMemo, useReducer, useContext, useEffect, useState } from "react";
import { useJobsFeed } from "./hook";

export const JobsFeedContext = React.createContext();
export const JobsFeedProvider = (({ children }) => {
    const jobFeedData = useJobsFeed();

    const contextValue = useMemo(() => {
        return jobFeedData;
    }, [jobFeedData]);

    return <JobsFeedContext.Provider value={contextValue}>
        {children}
    </JobsFeedContext.Provider>;
});



