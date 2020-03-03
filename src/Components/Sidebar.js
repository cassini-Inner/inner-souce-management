import React, { Component } from 'react';
import "../../assets/style/tailwind.css";

class Sidebar extends Component {

    state = {
        currentPage: "home",
        yourJobsToggle: false,
        hover: false,
    }  

    iconClasses = "w-1/6 pl-3 h-10 pt-3 pb-1 stroke-current text-white";
    selectionClasses = "bg-nebula-grey-700 border-l-4 border-nebula-blue-main";

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
                <div data-id="home" className={"flex " + (this.state.currentPage == "home"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>
                    {/* Svg for home icon */}
                    <svg className={this.iconClasses + (this.state.currentPage == "home"? " text-nebula-blue-main" : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <div className="w-5/6 h-12 pt-3 pl-10">Home</div>
                </div>
                <div data-id="yourJobs" className={"flex " + (this.state.currentPage == "yourJobs"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>
                    {/* Svg for your jobs icon */}
                    <svg className={this.iconClasses + (this.state.currentPage == "yourJobs"? " text-nebula-blue-main" : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 9V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <div className="w-4/6 h-12 pt-3 pl-10">Your Jobs</div>
                    {/* Svg for Dropdown */}
                    <svg className={"w-1/6 h-2 mt-5 stroke-current " + (this.state.currentPage == "yourJobs"? " text-nebula-blue-main" : " text-white")} viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.78525L7 7.78525L13 1.78525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
                <div id="yourJobsList" className={(this.state.yourJobsToggle?"block":"hidden")}>
                    <div data-id="ongoingJobs" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "ongoingJobs"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>Ongoing</div>
                    <div data-id="applications" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "applications"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>Applications</div>
                    <div data-id="completed" className={"w-full h-12 pt-3 pl-24 "+ (this.state.currentPage == "completed"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>Completed</div>
                </div>
                <div data-id="manageJobs" className={"flex " + (this.state.currentPage == "manageJobs"? this.selectionClasses : "hover:bg-nebula-grey-700")} onClick={this.selectRouteHandler.bind(this)}>
                    {/* Svg for manage jobs icon */}
                    <svg className={this.iconClasses + (this.state.currentPage == "manageJobs"? " text-nebula-blue-main " : "")} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M12 20H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04015C19.0692 3.14676 19.303 3.30301 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.1882C20.0665 4.44557 20.1213 4.72142 20.1213 5C20.1213 5.27857 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30301 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <div className="w-5/6 h-12 pt-3 pl-10">Manage Jobs</div>
                </div>
            </div>
        );
    }
}

export default Sidebar;