import React from 'react';
import { StatusTag, AuthorInfo } from '../CommonComponents';
import { exploreJobs } from '../../../assets/placeholder';

const JobInformation = (props) => {
    return (
        <React.Fragment>
            <div className="mt-8">
                <StatusTag statusTag={exploreJobs[0].status} />
            </div>
            <div className="mt-8">
                <h1 className="text-xl leading-snug">
                    {exploreJobs[0].title}
                </h1>
            </div>
            <div className="mt-6 mb-8">
                <p className="text-sm text-nebula-grey-700 leading-relaxed">
                    {exploreJobs[0].description}
                </p>
            </div>
            <div className="flex flex-wrap mb-8">
                <div className="mr-8 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            MILESTONES
                    </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {exploreJobs[0].noMilestones + " Milestones"}
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">DIFFICULTY</p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {exploreJobs[0].difficulty}
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            DURATION
                    </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {exploreJobs[0].duration}
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            SKILLS NEEDED
                    </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {exploreJobs[0].skills}
                        </p>
                    </div>
                </div>
                <AuthorInfo className="mt-8" iconClass="w-12 h-12" date={exploreJobs[0].date} />
            </div>
        </React.Fragment>
    );
}

export default JobInformation;
