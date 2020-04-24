import React, { Component, Fragment } from 'react'
import { explore } from '../../../assets/placeholder'
import * as Icons from 'react-feather'
import { Link } from 'react-router-dom'
import Button from '../Common/Button/Button'
import JobCard from './JobCard'
import Portal from '../Containers/Portal'
import ModalViewWithScrim from '../Modals/ModalViewWithScrim'
import FilterModal from '../Modals/FilterModal'
import { Query } from 'react-apollo';


class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterModal: false,
            filterModalSortValue: "",
            filterModalJobStatusValue: [],
            skills: [],
            filter: {
                status: ["OPEN","ONGOING"],
                skills:  this.props.userSkills? this.props.userSkills : [],
                sortOrder: "NEWEST",
            }
        };
    }


    openFilterModal = () => {
        this.setState({
            filterModal: true,
        });
    };

    closeFilterModal = () => {
        this.setState({
            filterModal: false,
            filterModalSortValue: "NEWEST",
            filterModalJobStatusValue: ["OPEN","ONGOING"],
            skills: this.props.userSkills,
        });
    };

    applyFilter = () => {
         this.setState({
            filterModal: false,
            filter: {
                status: this.state.filterModalJobStatusValue,
                skills: this.state.skills,
                sortOrder: this.state.filterModalSortValue,
            }
        });
    }
    

    filterModalSkillTags = (skillList) =>{
        this.setState({
            skills: skillList,
        });
    }

    filterModalSortDropdown = (event) =>{
        this.setState({
            filterModalSortValue : event.currentTarget.value.toUpperCase()
        });
    }


    filterModalJobStatusDropdown = (event) =>{
        let value= [];
        // if(event.currentTarget.value === "Open & Ongoing"){
        //     value = ["OPEN","ONGOING"]
        // }
        // else {
            value = [event.currentTarget.value.toUpperCase()]
        // }
        this.setState({
            filterModalJobStatusValue : value
        });
    }

    render() {
        let queryVariables = {};

        // If in Home page filter based on userskills or using the job filter modal
        if(this.props.location == "home") {
            queryVariables = { filter: this.state.filter };
        }
        // Else get the query variables from the parent component
        else {
            queryVariables = this.props.queryVariables;
        }

        if(this.props.query) {
            return (
                <Query query={ this.props.query } variables={ queryVariables } >
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error! ${error}`;
                    if(data["allJobs"]) {
                        return (
                            <Fragment>
                                <Portal isOpen={this.state.filterModal}  >
                                    <ModalViewWithScrim>
                                        <FilterModal 
                                            closeModal = {this.closeFilterModal} 
                                            sortDropdown = {this.filterModalSortDropdown} 
                                            jobStatusDropdown = {this.filterModalJobStatusDropdown}  
                                            getTagList = {this.filterModalSkillTags}
                                            applyFilter = {this.applyFilter}
                                        />
                                    </ModalViewWithScrim>
                                </Portal>
                                <div className="cursor-default ">
                                    <div className=" w-full mt-6 ">
                                        <h1 className="text-2xl flex-1">{this.props.title}</h1>
                                        {this.props.title == explore ? <Options setModalState={this.openFilterModal} /> : ""}
                                    <hr/>
                                    </div>
                                    {    
                                        data["allJobs"].map(data => {
                                            return (
                                            <JobCard data={data}/>
                                            );
                                        })
                                    }
                                </div>
                            </Fragment>
                        );
                    }
                    else {
                        return(<div>No Jobs</div>)
                    }
                    }}
                </Query>
            );
        }
        return(<div className="ml-2 mt-2">No Jobs</div>)
    }
}

const Options = (props) => {
    return (
        <div className="flex mt-4 h-12 w-full cursor-default">
            <div className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue" onClick={props.setModalState}>
                <h4 className="text-lg font-semi-bold pr-1">Filter Jobs</h4>
                <Icons.Filter className="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue" />
            </div>
            <div className="flex-1" />
            <Link to="/createJob"><Button label="Create a new Job" type="primary" /></Link>
        </div>
    );
};

export default JobList;
