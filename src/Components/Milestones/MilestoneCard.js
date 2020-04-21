import React, { Component } from 'react';
import * as Icons from "react-feather";
import InfoTag from '../Common/InfoTag/InfoTag'
import StatusTags from '../Common/StatusTags/StatusTags'
import  { DurationParser } from "../Common/DurationParser/DurationParser"; 

class MilestoneCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.expanded,
        }
    }

    toggleExpandedState = () => {
        const currentState = this.state.isExpanded;

        this.setState({
            isExpanded: !currentState,
        });
    }

    render() {
        const isExpanded = this.state.isExpanded;
        const isEditMode = this.props.isEditMode;
        return (
            <div className={"flex " + this.props.className}>
                <div>
                    <svg className="w-3 relative mt-6 fill-current text-nebula-grey-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="" />
                    </svg>
                    <div className={(this.props.index === this.props.lastIndex - 1 ? '' : 'h-full ') + ' w-px mx-auto bg-nebula-grey-400'}/>
                </div>
                <div className="mx-4 flex-1 ">
                    <div className="flex items-center flex-wrap">
                        <div className="flex flex-1 flex-col">
                            <div className="h-4"/>
                            <div className="flex-1">
                                <p className="font-semibold text-nebula-grey-600">Milestone #{this.props.index + 1}</p>
                            </div>
                            <div className="h-4"/>
                        </div>
                        {isEditMode &&
                            <div className="flex">
                                <Icons.Edit className="text-nebula-blue mx-4" />
                                <Icons.Delete className="text-nebula-red mx-4" />
                            </div>
                        }
                    </div>
                    <div className="bg-white rounded-md shadow-none border-nebula-grey-400 border p-6 cursor-pointer transition duration-100 hover:shadow-md" onClick={this.toggleExpandedState}>
                        <div className="flex flex-row justify-start items-start">
                            <p className="text-base leading-tight flex-1 font-semibold mb-2 pr-4 ">{this.props.milestone.title}</p>

                            <button className={" transition duration-150 ease-in-out transform " + (isExpanded ? "rotate-0" : "rotate-180")}>
                                    <Icons.ChevronUp />
                            </button>
                        </div>
                        <StatusTags statusTag={[this.props.milestone.status.toLowerCase()]}/>
                        {
                            isExpanded &&
                            <div >
                                <p className="pt-4 text-sm text-nebula-grey-700 leading-relaxed" >{this.props.milestone.description}</p>
                                <div className="flex flex-row flex-wrap">
                                    <InfoTag className="mr-6 mt-4" title="DURATION" data={ DurationParser(this.props.milestone.duration) } /> 
                                    <InfoTag className="mr-6 mt-4" title="RESOLUTION METHODS" data={this.props.milestone.resolution} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MilestoneCard;
