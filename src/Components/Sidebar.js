import React, { Component } from 'react';
import "../../assets/style/tailwind.css";
import * as Icons from "./Icons";

class Sidebar extends Component {

    state = {
        currentPage: "home",
        yourJobsToggle: false,
        hover: false,
        expanded: false,
    }

    iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-black";
    selectedClasses = " font-semibold  text-nebula-blue  bg-nebula-blue-light border-l-4 border-nebula-blue  hover:border-nebula-blue";
    unselectedClasses = " font-semibold  text-nebula-grey-700  hover:bg-nebula-grey-400 hover:border-nebula-grey-400 border-l-4 border-nebula-grey-200 ";

    selectRouteHandler = (e) => {
        let currentPage = e.currentTarget.dataset.id;
        if (currentPage == "yourJobs") {
            this.setState({
                currentPage: currentPage,
                yourJobsToggle: !this.state.yourJobsToggle
            });
        }
        else {
            this.setState({
                currentPage: currentPage,
            });

            this.expandCollapseSidebar();
        }
    }

    expandCollapseSidebar = () => {
        const currentState = this.state.expanded;
        console.log(currentState);
        this.setState({
            expanded: !currentState,
        });
    }

    render() {

        return (
            <div className="w-full border-l-0 sticky top-0 text-black bg-nebula-grey-200 border-nebula-grey-400 border border-r-0 px-2 lg:w-1/5 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-l-0">
                <div className="w-full h-16 lg:h-24 flex items-center ">
                    <p className="flex-1 text-2xl pl-3 font-bold">
                        Nebula
                    </p>
                    <button className="lg:hidden focus:outline-none" onClick={this.expandCollapseSidebar}>
                        {
                            this.state.expanded
                                ?
                                <Icons.MenuIcon />
                                :
                                <Icons.SearchIcon />

                        }
                    </button>
                </div>

                <div className={this.state.expanded ? "block" : "hidden lg:block "}>
                    <div data-id="home" className={"flex rounded mb-2 items-center h-12" + (this.state.currentPage == "home" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.HomeIcon currentPage={this.state.currentPage} className="ml-6" />
                        <div className="ml-10">Home</div>
                    </div>
                    <div data-id="yourJobs" className={"flex rounded mb-2 items-center h-12" + (this.state.currentPage == "yourJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.YourJobsIcon currentPage={this.state.currentPage} className="ml-6" />
                        <div className="ml-10">Your Jobs</div>
                        <Icons.DropdownIcon currentPage={this.state.currentPage} className="ml-6" />
                    </div>
                    <div id="yourJobsList" className={(this.state.yourJobsToggle ? "block" : "hidden")}>
                        <div data-id="ongoingJobs" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "ongoingJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                Ongoing
                        </p>
                        </div>

                        <div data-id="applications" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "applications" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                Applications
                        </p>
                        </div>

                        <div data-id="completed" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "completed" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                Completed
                        </p>
                        </div>

                    </div>
                    <div data-id="manageJobs" className={"flex rounded mb-2 items-center h-12" + (this.state.currentPage == "manageJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.ManageJobsIcon currentPage={this.state.currentPage} className="ml-6" />
                        <div className="ml-10">Manage Jobs</div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Sidebar;