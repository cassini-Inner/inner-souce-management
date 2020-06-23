import React, { useRef } from "react";
import * as Icons from "react-feather";
import { appName } from "../../../assets/placeholder";
import { NavLink, withRouter } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { actions } from "../../../hooks/JobFeedProvider/provider";
import {
    JobsFeedContext,
} from "../../../hooks/JobFeedProvider/provider";
import TextInput from "../../Common/InputFields/TextInput";
import ActionChip from "../../Common/Chips/ActionChip";
import Button from "../../Common/Button/Button";

const Sidebar = (props) => {
    const [expansionState, changeExpansionStatus] = React.useState({ expanded: false });

    const mobileExpandCollapseSidebar = (value) => {
        const currentState = expansionState.expanded;
        changeExpansionStatus({
            expanded: value != null ? value : !currentState,
        });
    };


    return (

        <div className={"w-auto border-l-0 lg:pt-4 z-50 sticky top-0 text-black bg-white border-nebula-grey-400 border border-r-0 px-0 lg:bg-nebula-grey-200 lg:z-10 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-t-0 lg:border-l-0 lg:w-84  xl:w-84"}>
            <div className="w-full h-12 lg:mt-6 flex items-center ">
                <NavLink
                    className="flex-1 pl-6 text-xl font-semibold hover:text-nebula-blue outline-none cursor-pointer"
                    to={"/"}
                >
                    {appName}
                </NavLink>
                <button className="lg:hidden focus:outline-none"
                    onClick={() => mobileExpandCollapseSidebar()}>
                    {
                        expansionState.expanded
                            ?
                            <Icons.X
                                className="h-5 w-5 text-nebula-blue stroke-current mr-4 " />
                            :
                            <Icons.Menu className="h-5 w-5 text-nebula-blue stroke-current mr-4 " />
                    }
                </button>
            </div>
            <div className={expansionState.expanded ? "absolute w-full bg-white sm:shadow-lg pb-4 " : "hidden lg:block "}>
                <ul>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Compass />}
                            location="/"
                            label="Explore Jobs"
                            exactLink={true}
                        />
                    </li>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Activity />}
                            location="/yourJobs"
                            label="Your Applications"
                            exactLink={false}
                        />
                    </li>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Edit3 />}
                            location="/manageJobs"
                            exactLink={false}
                            label="Created Jobs"
                        />
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default withRouter(Sidebar);

