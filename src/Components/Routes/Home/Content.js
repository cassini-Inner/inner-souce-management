import React  from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER } from "../../../queries";
import { GET_USER_ONGOING_JOBS } from "../../../queries";
import { GET_USER_SKILLS } from "../../../queries"; 
import {useQuery} from "@apollo/client";
import {connect} from "react-redux";

const Content = (props) => {
    
    const {loading, error, data} = useQuery(GET_USER_SKILLS, { variables: {userId: props.user.id} , fetchPolicy:"cache-and-network"});
    if (loading) return "Loading...";
    else if (error) return (`Error! ${error.message}`);
    const userSkills = data.User.skills ? data.User.skills.map((skill, key) => skill.value): [];
    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" query = {GET_USER_ONGOING_JOBS} />
            <JobList title = "Explore Jobs" location = "home" query = {GET_ALL_JOBS_FILTER} userSkills = {userSkills} />
        </div>
    );

};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Content);
