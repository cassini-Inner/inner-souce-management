import React,{ Component } from 'react';
import { PrimaryButton, InfoTag, AuthorInfo, StatusTag } from './CommonComponents';
import { exploreJobs } from "../../assets/placeholder";
import { FilterIcon } from "./Icons";

class JobList extends Component {
    render() {
        return (
            <div>
                <div className="flex w-full mt-6">
                    <h1 className="text-2xl flex-1">{this.props.title}</h1>
                </div>
                <Options />
                {
                    exploreJobs.map(data => {
                        return(
                            <div className="w-full p-6 bg-white mt-5" key={data.title}>
                                <h1 className="text-xl font-semibold">{data.title}</h1>
                                <div className="mt-2 text-nebula-grey-600 mb-8">
                                    {data.description}
                                </div>
                                <div className="flex mb-4">
                                    <div className="flex-1">
                                        <div className="flex">
                                            <div className="mr-6">
                                                <InfoTag title="MILESTONES" data={data.noMilestones + " Milestones"} />
                                            </div>
                                            <div className="mr-6">
                                                <InfoTag title="DIFFICULTY" data={data.difficulty} />
                                            </div>
                                            <div className="mr-6">
                                                <InfoTag title="DURATION" data={data.duration} />
                                            </div>
                                            <div className="mr-6">
                                                <InfoTag title="SKILLS NEEDED" data={data.skills} />
                                            </div>
                                        </div>
                                    </div>
                                    <AuthorInfo />
                                </div>
                                <hr />
                                <div className="flex mt-4">
                                    <div className="flex-1">
                                        <div className="flex">
                                            <div><StatusTag statusTag = {data.status} /></div>
                                            <div className="text-nebula-grey-600 ml-6 text-sm">{"created on " + data.date}</div>
                                        </div>
                                    </div>
                                    <h1 className="cursor-pointer text-sm font-semibold text-nebula-blue hover:text-blue-700">View Details</h1>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const Options = () => {
    return(
        <div className="flex mt-4 h-12">
                <div className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer hover:bg-nebula-blue-light hover:text-nebula-blue">
                    <h4 className="text-lg font-semi-bold pr-1">Filter Jobs</h4>
                    <FilterIcon class="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue"/>
                </div>
                <div className="flex-1" />
            <PrimaryButton name="Add a new Job" />
        </div>
    );
}

export default JobList;