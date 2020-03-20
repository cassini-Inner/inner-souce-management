import React, { Component } from 'react';
import "../../../assets/style/tailwind.css";
import * as Icons from "react-feather"
import * as config from "../../../assets/placeholder";
import { NavLink, Link } from 'react-router-dom';

class Sidebar extends Component {

    state = {
        currentPage: this.props.page ? this.props.page : "home",
        hover: false,
        mobileExpanded: false,
        desktopExpanded: true,
    }
    
    iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-black";
    selectedClasses = " font-semibold transition duration-300  text-nebula-blue  bg-nebula-blue-light border-l-4 border-nebula-blue  hover:border-nebula-blue cursor-pointer hover:shadow-inner";
    unselectedClasses = " font-semibold transition duration-300  text-nebula-grey-700  hover:bg-nebula-grey-400 hover:border-nebula-grey-400 border-l-4 border-nebula-grey-200 cursor-pointer hover:shadow-inner ";

    selectRouteHandler = (e) => {
        const currentPage = e.currentTarget.dataset.id;
        if (currentPage === "home" || currentPage === "manageJobs") {
            this.setState({
                currentPage: currentPage,
            });
        } else if (currentPage === "yourJobs") {
            this.setState({
                currentPage: currentPage,
            });
        } else {
            this.setState({
                currentPage: currentPage,
            });
        }
    }

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
            <div className={"w-auto border-l-0 z-50 sticky top-0 text-black bg-nebula-grey-200 border-nebula-grey-400 border border-r-0 px-2 lg:z-10 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-l-0 " + (desktopExpanded ? "lg:w-84 " : "lg:w-auto")}>
                <div className="w-full h-16 lg:h-24 flex items-center ">
                    <NavLink exact className="flex-1 text-2xl pl-3 font-bold hover:text-nebula-blue outline-none cursor-default" to={'/'}>
                        Nebula
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
                            <NavLink exact to="/" data-id="home" className={"cursor-default flex rounded mb-2 items-center h-12" + (this.state.currentPage == "home" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                                <Icons.Home currentPage={this.state.currentPage} className="ml-6" />
                                {desktopExpanded && <div className="ml-10 ">{config.home}</div>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/yourJobs" data-id="yourJobs" className={"cursor-default flex rounded mb-2 items-center h-12" + (this.state.currentPage == "yourJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                                <Icons.GitBranch currentPage={this.state.currentPage} className="ml-6" />
                                {desktopExpanded && <div className="ml-10 flex-1" >{config.yourJobs}</div>}
                                
                            </NavLink>
                        </li>
                        <li>

                            <div data-id="manageJobs" className={"cursor-default flex rounded mb-2 items-center h-12" + (this.state.currentPage == "manageJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                                <Icons.Edit3 currentPage={this.state.currentPage} className="ml-6" />
                                {desktopExpanded && <div className="ml-10  block ">{config.manageJobs}</div>}
                            </div>
                        </li>
                    </ul>
                </div>
            </div >
        );
    }
}
export default Sidebar;
