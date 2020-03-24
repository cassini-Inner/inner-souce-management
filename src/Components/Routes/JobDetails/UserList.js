import React, { Fragment } from "react";
import * as Icons from "react-feather";
import { jobApplication } from "../../../../assets/placeholder";
import StatusTag from "../../Common/StatusTags/StatusTags";
import Avatar from "../../Common/Avatar/Avatar";


const UserList = () => {
    return(
        jobApplication.map(({name, designation, type, milestones}) =>{
            return (
                <div className="border-b border-nebula-gray-400" key="name">
                    <div className = "mt-4 mb-2 flex">
                        <Avatar imagePath="../assets/icons/Ellipse 3.png"/>
                        <div className = "flex-col ml-4 mb-2 flex-1">
                            <div className = "text font-semibold">{name}</div>
                            <div className = "text-nebula-grey-600 text-sm">{designation}</div>
                            <div className = "text-nebula-blue font-semibold text-sm">{ milestones ? ("Milestones "+milestones) : "" }</div>
                        </div>
                        <div className = "flex self-center">
                            <StatusTag statusTag = { [type] } />
                        </div>
                        <div className = "flex">
                            <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-red-light">
                                <Icons.X className=" h-4 w-4 stroke-current text-nebula-red hover:text-black" />
                            </div>
                            <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-blue-light">
                                <Icons.Check className=" h-4 w-4 stroke-current text-nebula-blue hover:text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default UserList;
