import React, { Component, Fragment } from 'react';
import { ongoingJobs } from '../../../assets/placeholder';
import { StatusTag, AuthorInfo } from "../CommonComponents";

class OngoingJobs extends Component {
    
    render() {
        // const ongoingJobsGrid = getongoingJobsGrid(ongoingJobs);

        return(
            <div>
                <div className="flex w-full">
                    <h1 className="text-2xl flex-1">Ongoing Jobs</h1>
                    <h1 className="cursor-pointer text-sm font-semibold text-nebula-blue-main mt-3 hover:text-blue-700">SEE ALL JOBS</h1>
                </div>
                <div className="flex mt-4">
                     {ongoingJobs.map( data => { 
                        return(
                            <div className="bg-white w-1/2 p-6 mr-4" key={data.title}>
                                <h2 className="text-lg font-semibold mb-4">{data.title}</h2>
                                <StatusTag statusTag="ongoing" />
                                <div className="flex">
                                    <div className="w-1/2 mt-8">
                                        <p className="text-nebula-grey-600 font-semibold">PROGRESS</p>
                                        <h1 className="text-lg font-semibold">{(data.completedMilestones/data.noMilestones*100) + "%"}</h1>
                                        <p className="text-nebula-grey-600 font-semibold">{data.completedMilestones +" of " + data.noMilestones + " milestones"}</p>
                                    </div>
                                    <div className="w-1/2 mt-8">
                                    <p className="text-nebula-grey-600 font-semibold">POSTED BY</p>
                                    <AuthorInfo />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        );
    }
}

// const getongoingJobsGrid = (ongoingJobs) => {
//     let grid = ongoingJobs.array.forEach((element,index) => {
//         if(index%2==0)
//             return(
                    // <div className="bg-white w-1/2 p-6" key={element.title}>
                    //     <h2 className="text-lg font-semibold mb-4">{element.title}</h2>
                    //     <StatusTags statusTag="ongoing" />
                    //     <div className="flex">
                    //         <div className="w-1/2 mt-8">
                    //             <p className="text-nebula-grey-600">PROGRESS</p>
                    //             <h1 className="text-lg">{(element.completedMilestones/element.noMilestones*100) + "%"}</h1>
                    //             <p className="text-gray-500">{element.completedMilestones +" of " + element.noMilestones + " milestones"}</p>
                    //         </div>
                    //         <div className="w-1/2 mt-8">
                    //         <p className="text-gray-500">POSTED BY</p>
                    //         <div className="flex">
                    //             <img src="../assets/icons/image 1.png" className="mt-1 w-9 h-9"/>
                    //             <p className="ml-1 mt-2 font-bold">{element.postedBy}</p>
                    //         </div>
                    //         </div>
                    //     </div>
                    // </div>
//             );
//         else

//     });
//     return grid;
// }

export default OngoingJobs;