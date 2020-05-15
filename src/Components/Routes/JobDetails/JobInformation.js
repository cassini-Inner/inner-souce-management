import React from "react";
import { withRouter } from "react-router-dom";
import StatusTags from "../../Common/StatusTags/StatusTags";
import AuthorInfo from "../../Common/AuthorInfo/AuthorInfo";
import { useQuery } from "@apollo/client";
import InfoTag from "../../Common/InfoTag/InfoTag";
import { GET_JOB_DETAILS } from "../../../queries";
import { getDuration } from "../../../HelperFunctions/DurationParser";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";

const JobInformation = (props) => {

    const { loading, error, data } = useQuery(GET_JOB_DETAILS, {
        variables: { jobId: props.jobId },
        fetchPolicy: "cache-first",
    });
    if (loading) {
        return (<LoadingIndicator />);
    }

    //TODO: show show an error state in case the job is not found

    //To get the duration of the job by summing the duration of milestones
    return (
        <React.Fragment>
            <div className="mt-8">
                <StatusTags statusTag={[data["Job"].status.toLowerCase()]} />
            </div>
            <div className="mt-8">
                <h1 className="text-xl font-semibold leading-snug">
                    {data["Job"].title}
                </h1>
            </div>
            <div className="mt-2 mb-8">
                <p className="text-md text-nebula-grey-700 leading-relaxed">
                    {data["Job"].description}
                </p>
            </div>
            <div className="flex flex-wrap mb-4">
                <div className="mr-8 mb-4 ">
                    <InfoTag title="MILESTONES"
                        data={data["Job"]["milestones"].totalCount +
                            " Milestones"} />
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DIFFICULTY" data={data["Job"].difficulty} />
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DURATION" data={getDuration(
                        data["Job"]["milestones"]["milestones"])} />
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="CREATED ON" data={new Date(
                        data["Job"].timeCreated).toDateString()} />
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="WORKING"
                        data={data["Job"]["applications"]["acceptedCount"] +
                            (data["Job"]["applications"]["acceptedCount"] > 1
                                ? " users"
                                : " user")} />
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="SKILLS NEEDED"
                        data={data["Job"]["skills"].map(
                            (skill, index) => skill.value + " ")} />
                </div>
            </div>
            <AuthorInfo
                className="mt-2 pb-8"
                iconClass="w-12 h-12"
                redirectUrl={data["Job"].createdBy.id}
                department={data["Job"].createdBy.department}
                name={data["Job"].createdBy.name}
                img={data["Job"].createdBy.photoUrl}
            />
        </React.Fragment>
    );
};

export default withRouter(JobInformation);
