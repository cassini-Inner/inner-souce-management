import React from "react";
import * as Icons from "react-feather";
import { jobApplication } from "../../../../assets/placeholder";
import StatusTag from "../../Common/StatusTags/StatusTags";


const UserList = () => {
    return(
        jobApplication.map(({name, designation, type, milestones}) =>{
            return(
                <div className = "my-4 flex border-b-2 border-nebula-grey-400">
                    <img src="../assets/icons/Ellipse 3.png" className="flex-0 h-12 w-12 rounded-full" />
                    <div className = "flex-col ml-2 mb-2 flex-1">
                        <div className = "text-lg font-semibold">{name}</div>
                        <div className = "text-nebula-grey-600">{designation}</div>
                        <div className = "text-nebula-blue font-semibold">{ milestones ? ("Milestones "+milestones) : "" }</div>
                    </div>
                    <div className = "flex self-center">
                        <StatusTag statusTag = { [type] } />
                    </div>
                    <div className = "flex">
                        <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-red-light">
                            <Icons.X className=" h-8 w-8 stroke-current text-nebula-red hover:text-black" />
                        </div>
                        <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-blue-light">
                            <Icons.Check className=" h-8 w-8 stroke-current text-nebula-blue hover:text-black" />
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default UserList;
