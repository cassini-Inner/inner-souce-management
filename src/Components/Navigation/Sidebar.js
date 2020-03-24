import React, { Component } from 'react';
import "../../../assets/style/tailwind.css";
import * as Icons from "react-feather"
import * as config from "../../../assets/placeholder";
import { NavLink, Link } from 'react-router-dom';
import { appName } from "../../../assets/placeholder";

class Sidebar extends Component {

    state = {
        currentPage: this.props.page ? this.props.page : "home",
        hover: false,
        mobileExpanded: false,
        desktopExpanded: true,
    }
    
    iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-black ";
    selectedClasses = " text-nebula-blue bg-nebula-blue-light border-nebula-blue ";
    unselectedClasses = "flex flex-row items-center text-nebula-grey-600 h-12 my-4 font-semibold border-l-4 border-transparent ";
   
    mobileExpandCollapseSidebar = () => {
        const currentState = this.state.mobileExpanded;
        this.setState({
            mobileExpanded: !currentState,
        });
    }

    desktopExpandCollapseSidebar = () => {
        const currentDesktopState = this.state.desktopExpanded;
        this.setState({ desktopExpanded: !currentDesktopState });
    }


    render() {
        const desktopExpanded = this.state.desktopExpanded;

        return (
            <div className={"w-auto border-l-0 z-50 sticky top-0 text-black bg-nebula-grey-200 border-nebula-grey-400 border border-r-0 px-0 lg:z-10 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-l-0 " + (desktopExpanded ? "xl:w-84 " : "lg:w-auto")}>
                <div className="w-full h-16 lg:h-24 flex items-center ">
                    <NavLink
                        className="flex-1 text-2xl pl-3 font-bold hover:text-nebula-blue outline-none cursor-pointer" 
                        to={'/'}>
                        { appName }
                    </NavLink>
                    <button className="lg:hidden focus:outline-none" onClick={this.mobileExpandCollapseSidebar}>
                        {
                            this.state.mobileExpanded
                                ?
                                <Icons.X className="h-8 w-8 text-nebula-blue stroke-current p-1" />
                                :
                                <Icons.Menu className="h-8 w-8 text-nebula-blue stroke-current p-1" />
                        }
                    </button>
                </div>
                <div className={this.state.mobileExpanded ? "block " : "hidden lg:block "}>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={()=>{this.mobileExpandCollapseSidebar()}}
                                >
                                <Icons.Home className="ml-6" />
                                {desktopExpanded &&
                                    <div className="ml-10 ">{config.home}</div>
                                }
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/yourJobs"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={()=>{this.mobileExpandCollapseSidebar()}}
                            >
                                <Icons.GitBranch className="ml-6" />
                                {desktopExpanded &&
                                    <div className="ml-10 flex-1" >{config.yourJobs}</div>
                                }
                            </NavLink>
                        </li>
                        <li>
                             <NavLink
                                to="/manageJobs"
                                activeClassName={this.selectedClasses}
                                className={this.unselectedClasses}
                                onClick={()=>{this.mobileExpandCollapseSidebar()}}
                            >
                                <Icons.Edit3 className="ml-6" />
                                {desktopExpanded &&
                                    <div className="ml-10 flex-1" >{config.manageJobs}</div>
                                }
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        );
    }
}
export default Sidebar;
