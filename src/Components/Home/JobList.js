import React,{ Component } from 'react';
import { PrimaryButton, InfoTag, AuthorInfo, StatusTag } from '../CommonComponents';
import { exploreJobs } from "../../../assets/placeholder";

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
                            <div className="w-full p-6 bg-white mt-4" key={data.title}>
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
                                    <h1 className="cursor-pointer text-sm font-semibold text-nebula-blue-main hover:text-blue-700">View Details</h1>
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
        <div className="flex mt-4">
            <div className="flex-1">
                <div className="flex">
                    <div className="bg-white pt-1 pl-2 pr-2 flex rounded-sm">
                        <div>
                            <p className="text-nebula-grey-600 text-xs">Sort By</p>
                            <h4 className="text-lg font-semi-bold">Oldest</h4>
                        </div>
                        <p className="pt-6 text-lg pl-12">^</p>
                    </div>
                    <div className="bg-white pt-1 pl-2 pr-2 ml-6 flex rounded-sm">
                        <div>
                            <p className="text-nebula-grey-600 text-xs">Job Status</p>
                            <h4 className="text-lg font-semi-bold">Open</h4>
                        </div>
                        <p className="pt-6 text-lg pl-12">^</p>
                    </div>
                </div>
            </div>
            <PrimaryButton name="Add a new Job" />
        </div>
    );
}

export default JobList;