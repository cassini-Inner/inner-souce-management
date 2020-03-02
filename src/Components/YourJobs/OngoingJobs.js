import React, { Component, Fragment } from 'react';
import ongoingJobs from '../../../assets/placeholder.json';
import StatusTags from "../StatusTags";

class OngoingJobs extends Component {
    
    render() {
        return(
            <div>
                <div className="flex w-full">
                    <h1 className="text-2xl flex-1">Ongoing Jobs</h1>
                    <h1 className="cursor-pointer text-sm font-bold text-nebula-blue-main mt-3 mr-24 hover:text-blue-700">SEE ALL JOBS</h1>
                </div>
                <div className="flex mt-4">
                    { ongoingJobs.map( (data) => {
                        return(
                            <div className="bg-white w-auto p-6 mr-6" key={data.title}>
                                <h2 className="text-lg font-bold mb-3">{data.title}</h2>
                                <StatusTags statusTag="ongoing" />
                                <div className="flex">
                                    <div className="w-1/2 mt-8">
                                        <p className="text-gray-500">PROGRESS</p>
                                        <h1 className="text-lg">{(data.completedMilestones/data.noMilestones*100) + "%"}</h1>
                                        <p className="text-gray-500">{data.completedMilestones +" of " + data.noMilestones + " milestones"}</p>
                                    </div>
                                    <div className="w-1/2 mt-8">
                                    <p className="text-gray-500">POSTED BY</p>
                                    <div className="flex">
                                        <img src="../assets/icons/image 1.png" className="mt-1 w-9 h-9"/>
                                        <p className="ml-1 mt-2 font-bold">{data.postedBy}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default OngoingJobs;