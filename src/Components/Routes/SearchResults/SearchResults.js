import React, { useContext } from "react";
import JobList from "../../Jobs/JobList";
import { withRouter, Redirect, Route } from "react-router";
import { SEARCH_ALL_JOBS_USERS_LIMIT } from "../../../queries";
import { useQuery } from "@apollo/client";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import Navbar from "../../Navigation/Navbar/Navbar";
import TabStrip from "../../Common/TabStrip/TabStrip";
import UserCardsGrid from "./UserCardsGrid";

const SearchResults = (props) => {
    const query = decodeURI(props.match.params.query);
    if(query.trim() === "") {
        props.history.push("/");
    }
    const {loading, error, data} = useQuery(
        SEARCH_ALL_JOBS_USERS_LIMIT,
        { variables: { query: query, limit:null }, fetchPolicy: "network-only" },
    );
    if ((loading || data == null) && !error) {
        return <LoadingIndicator/>;
    }
    if (error) {
        return "Error loading job";
    }
    let tabList = [
        {
            title: "Jobs",
            location: "jobs",
            count: data.Search.jobs ? data.Search.jobs.length : 0,
        },
        {
            title: "People",
            location: "people",
            count: data.Search.users ? data.Search.users.length : 0,
        },
    ];
    return (
        <div className=" px-4 lg:px-10 bg-white w-full ">
            <Navbar />
            <h1 className="p-2 text-xl">Search Results</h1>
            <TabStrip tabs={tabList}/>
            {
                location.pathname === ("/searchResults/" + encodeURI(query)) ?
                    <Redirect to={props.match.url + "/jobs"}/> : ""
            }
            <Route exact
                path={props.match.url + "/jobs"}
                component={(props) => data.Search.jobs ? <JobList jobs={data.Search.jobs}/> : <p className="mt-2">No jobs found matching the query!</p>}
            />
            <Route exact path={props.match.url + "/people"}
                component={(props) => <UserCardsGrid users={data.Search.users}/>} />
        </div>
    );
};

export default withRouter(SearchResults);
