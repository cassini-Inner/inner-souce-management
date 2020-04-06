import React from "react";
import TabStrip from "../../Common/TabStrip/TabStrip";
import { Redirect, Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { exploreJobs } from "../../../../assets/placeholder";
import Navbar from "../../Navigation/Navbar";
import JobCard from "../../Jobs/JobCard";
import Button from "../../Common/Button/Button";
import StickyHeader from "../../Common/StickyHeader/StickyHeader";

const ManageJobs = (props) => {
    {
        location.pathname === "/manageJobs" ? <Redirect
            to={props.match.url + "/ongoing"} /> : "";
    }
    const tabList = [
        {
            title: "Ongoing",
            location: "ongoing",
            count: 2,
        },
        {
            title: "Completed",
            location: "completed",
            count: 3,
        },
    ];
    return (
        <div className="px-8">
            <Navbar />
            <StickyHeader>
                <div className="flex py-4 mx-1">
                    <div className="text-xl font-semibold flex-1">
                        Created Jobs
                    </div>
                    <div className="flex">
                        <Link to="/createJob">
                            <Button type="primary" label="Create new job" />
                        </Link>
                    </div>
                </div>
                <TabStrip tabs={tabList} />
            </StickyHeader>
            <div className="my-2">
                <Route exact path={props.match.url + "/ongoing"}
                    component={(props) => <JobList />} />
                <Route exact path={props.match.url + "/completed"}
                    component={(props) => <JobList />} />
            </div>
        </div>
    );
};

const JobList = (props) => {
    return (
        exploreJobs.map((data, index) => {
            return (
                <div className="my-8 border border-nebula-grey-400 rounded-lg transition duration-300 shadow-none cursor-pointer hover:shadow-lg" key={index}>
                    <div className="flex mt-1">
                        <div className="self-center font-semibold text-nebula-blue text-sm ml-6 ">
                            View 6 Applications
                        </div>
                        <div className="flex py-8 px-8">
                            <div className="self-center rounded-full bg-nebula-blue-light p-1 z-0 absolute">
                                <img src="../../assets/icons/Ellipse 1.png" className="flex-0 h-8 w-8 rounded-full" />
                            </div>
                            <div className="self-center rounded-full bg-nebula-blue-light p-1 z-10 absolute ml-8">
                                <img src="../../assets/icons/Ellipse 2.png" className="flex-0 h-8 w-8 rounded-full" />
                            </div>
                            <div className="self-center rounded-full bg-nebula-blue-light p-1 z-20 absolute ml-16">
                                <img src="../../assets/icons/Ellipse 3.png" className="flex-0 h-8 w-8 rounded-full" />
                            </div>
                        </div>
                        <div className="self-center text-lg font-semibold text-nebula-grey-500 ml-24">+3</div>
                    </div>
                    <hr />
                    <JobCard data={data} manageJobs={true} />
                </div>
            );
        })
    );
};

export default withRouter(ManageJobs);