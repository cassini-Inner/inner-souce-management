import React, { Component } from 'react';
import "../../assets/style/tailwind.css";
import * as Icons from "./Icons";
import * as config from "../../assets/placeholder";

class Sidebar extends Component {
    
    state = {
        currentPage: this.props.page?this.props.page:"home",
        yourJobsToggle: false,
        hover: false,
        expanded: false,
    }

    componentDidMount() {
        if(this.props.page=="yourJobs")
        { 
            this.setState({
                yourJobsToggle: true  
            })
        }
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
                    <a className="flex-1 text-2xl pl-3 font-bold hover:text-nebula-blue outline-none cursor-default" href="/">
                        Nebula
                    </a>
                    <button className="lg:hidden focus:outline-none" onClick={this.expandCollapseSidebar}>
                        {
                            this.state.expanded
                                ?
                                <Icons.MenuIcon className="h-6 w-6 text-nebula-blue stroke-current" />
                                :
                                <Icons.CloseIcon className="h-6 w-6 text-nebula-blue stroke-current" />

                        }
                    </button>
                </div>

                <div className={this.state.expanded ? "block" : "hidden lg:block "}>
                    <a href="/" data-id="home" className={"cursor-default flex rounded mb-2 items-center h-12" + (this.state.currentPage == "home" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.HomeIcon currentPage={this.state.currentPage} className="ml-6" />
                        <div className="ml-10">{config.home}</div>
                    </a>
                    <a href="/yourJobs" data-id="yourJobs" className={"cursor-default flex rounded mb-2 items-center h-12" + (this.state.currentPage == "yourJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.YourJobsIcon currentPage={this.state.currentPage} className="ml-6" />
                        <div className="ml-10">{config.yourJobs}</div>
                        <Icons.DropdownIcon currentPage={this.state.currentPage} className="ml-6" />
                    </a>
                    <div id="yourJobsList" className={(this.state.yourJobsToggle ? "block" : "hidden")}>
                        <a href = { "#"+config.ongoing } data-id="ongoingJobs" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "ongoingJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                { config.ongoing }
                        </p>
                        </a>

                        <a href = { "#"+config.applications } data-id="applications" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "applications" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                { config.applications }
                        </p>
                        </a>

                        <a href = { "#"+config.completed } data-id="completed" className={"w-full h-12 flex items-center mb-2" + (this.state.currentPage == "completed" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                            <div className="w-6 h-6 ml-6"></div>
                            <p className="ml-10">
                                {config.completed}
                        </p>
                        </a>

                    </div>
                    <div data-id="manageJobs" className={"flex rounded mb-2 items-center h-12" + (this.state.currentPage == "manageJobs" ? this.selectedClasses : this.unselectedClasses)} onClick={this.selectRouteHandler.bind(this)}>
                        <Icons.ManageJobsIcon currentPage={this.state.currentPage} className="ml-6" />
                    <div className="ml-10">{config.manageJobs}</div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Sidebar;