import React, { Component } from 'react';
import "../../assets/style/tailwind.css";
import * as Icons from "./Icons";

class Sidebar extends Component {

    state = {
        currentPage: "home",
        yourJobsToggle: false,
        hover: false,
    }  

    iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-white";
    selectionClasses = "bg-nebula-grey-700 border-l-4 border-nebula-blue";

    selectRouteHandler = (e) => {
        let currentPage = e.currentTarget.dataset.id;
        if(currentPage=="yourJobs") {
            this.setState({
                currentPage: currentPage,
                yourJobsToggle: !this.state.yourJobsToggle
            });
        }
        else {
            this.setState({
                currentPage: currentPage,
            });
        }
       
    } 

    render() {
        
        return (    
            <div className="w-1/5 h-screen sticky top-0 text-white bg-nebula-grey-800">
                <div className="w-full">
                    <div className="text-xl pt-12 pb-6 pl-3">
                        Nebula
                    </div>
                </div>
                <div data-id="home" className={"flex " + (this.state.currentPage == "home"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>
                    <Icons.HomeIcon currentPage={this.state.currentPage}/>
                    <div className="w-5/6 h-12 pt-3 pl-10">Home</div>
                </div>
                <div data-id="yourJobs" className={"flex " + (this.state.currentPage == "yourJobs"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>
                    <Icons.YourJobsIcon currentPage={this.state.currentPage} />
                    <div className="w-4/6 h-12 pt-3 pl-10">Your Jobs</div>
                    <Icons.DropdownIcon currentPage={this.state.currentPage} />
                </div>
                <div id="yourJobsList" className={(this.state.yourJobsToggle?"block":"hidden")}>
                    <div data-id="ongoingJobs" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "ongoingJobs"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>Ongoing</div>
                    <div data-id="applications" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "applications"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>Applications</div>
                    <div data-id="completed" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "completed"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>Completed</div>
                </div>
                <div data-id="manageJobs" className={"flex " + (this.state.currentPage == "manageJobs"? this.selectionClasses : "hover:bg-nebula-grey-700 hover:border-nebula-grey-700 border-l-4 border-nebula-grey-800")} onClick={this.selectRouteHandler.bind(this)}>
                    <Icons.ManageJobsIcon currentPage={this.state.currentPage} />
                    <div className="w-5/6 h-12 pt-3 pl-10">Manage Jobs</div>
                </div>
            </div>
        );
    }
}

export default Sidebar;