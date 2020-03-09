import React, { Fragment, Component } from 'react';

import { StatusTag, InfoTag } from '../CommonComponents';
import { EditIcon, ChevronDownIcon, DeleteIcon, ChevronUpIcon } from '../Icons';

class MilestoneCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: true,
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
            <div className="flex">
                <div>
                    <svg className="w-3 relative mt-6" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="#B3B3B3" />
                    </svg>
                    <div className={(this.props.index === this.props.lastIndex - 1 ? "" : "h-full ") + " w-px mx-auto bg-nebula-grey-400"}></div>
                </div>
                <div className="mx-4 flex-1 ">
                    <div className="flex items-center flex-wrap">
                        <div className="flex flex-1 flex-col">

                            <div className="h-4"></div>
                            <div className="flex-1">
                                <p className="font-semibold text-nebula-grey-600">Milestone #{this.props.index + 1}</p>
                            </div>
                            <div className="h-4"></div>
                        </div>
                        {
                            isEditMode &&
                            <div className="flex">
                                <EditIcon className="text-nebula-blue mx-4" />
                                <DeleteIcon className="text-nebula-red mx-4" />
                            </div>
                        }
                    </div>
                    <div className="bg-nebula-grey-100 shadow-xs p-6 cursor-pointer transition duration-100 hover:shadow-lg" onClick={this.toggleExpandedState}>
                        <div className="flex flex-row justify-start items-start">
                            <p className="text-lg leading-tight flex-1 font-semibold mb-2 pr-4 ">{this.props.milestone.title}</p>
                            {isExpanded ?
                                <button>
                                    <ChevronUpIcon ></ChevronUpIcon>
                                </button>
                                :
                                <button>
                                    <ChevronDownIcon ></ChevronDownIcon>
                                </button>
                            }
                        </div>
                        <StatusTag statusTag={this.props.milestone.status}></StatusTag>
                        {
                            isExpanded &&
                            <div >
                                <p className="pt-4 text-nebula-grey-700" >{this.props.milestone.description}</p>
                                <div className="flex flex-row flex-wrap">
                                    <InfoTag className="mr-6 mt-4" title="DURATION" data={this.props.milestone.durationCount + " " + this.props.milestone.durationUnit} />
                                    <InfoTag className="mr-6 mt-4" title="RESOLUTION METHODS" data={this.props.milestone.resolutionMethods} />
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