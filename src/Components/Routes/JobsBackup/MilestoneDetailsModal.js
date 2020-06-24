import React from "react";
import ModalContainer from "../../Modals/ModalContainer";
import { XCircle } from "react-feather";
import MilestoneCard from "../../Milestones/MilestoneCard";

const MilestoneModal = (props) => {
    return (
        <ModalContainer>
            <div id="header" className="text-lg mb-4 flex">
                <h1 className="text-lg flex-1">{props.data.title}</h1>
                <h1 className="text-lg flex hover:text-nebula-blue cursor-pointer" onClick={ props.closeMilestoneModal }><XCircle /></h1>
            </div>
            <hr />
            <div id="content" className="mt-4 mb-10 bg-white w-full h-full overflow-y:scroll">
                {/* <p className="mb-2">{props.data.milestones.totalCount} Milestones</p> */}
                {
                    props.data.milestones.milestones.map(
                        (milestone, index) => {
                            return (
                                <MilestoneCard 
                                    key={milestone.id}
                                    milestone = { milestone } 
                                    index = { index } 
                                    lastIndex = { props.data.milestones.totalCount } 
                                />
                            );
                        })
                }
            </div>
        </ModalContainer>

    );
};


export default MilestoneModal;
