import React, { Component, Fragment } from 'react';
import { explore } from '../../../assets/placeholder';
import * as Icons from 'react-feather';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import JobCard from './JobCard';
import Portal from '../Containers/Portal';
import ModalViewWithScrim from '../Modals/ModalViewWithScrim';
import FilterModal from '../Modals/FilterModal';
import { Query } from '@apollo/react-components';
import LoadingIndicator from '../Common/LoadingIndicator/LoadingIndicator';

class JobList extends Component {

    constructor (props) {
        super(props)
        this.defaultSortOrder = 'NEWEST'
        this.defaultJobStatus = ['OPEN', 'ONGOING']
        this.state = {
            filterModal: false,
            filterModalSortValue: '',
            filterModalJobStatusValue: [],
            skills: [],
            filter: {
                status: this.defaultJobStatus,
                skills: this.props.userSkills ? this.props.userSkills : [],
                sortOrder: this.defaultSortOrder,
            },
        }
    }

    openFilterModal = () => {
        this.setState({
            filterModal: true,
        })
    }

    closeFilterModal = () => {
        this.setState({
            filterModal: false,
        })
    }

    resetFilter = () => {
        //Reset to default filters on reseting the filter
        this.setState({
            filterModal: false,
            filterModalSortValue: this.defaultSortOrder,
            filterModalJobStatusValue: this.defaultJobStatus,
            skills: this.props.userSkills,
            filter: {
                sortOrder: this.defaultSortOrder,
                status: this.defaultJobStatus,
                skills: this.props.userSkills,
            },
        })
    }

    applyFilter = () => {
        this.setState({
            filterModal: false,
            filter: {
                status: this.state.filterModalJobStatusValue
                  ? this.state.filterModalJobStatusValue
                  : this.defaultJobStatus,
                skills: this.state.skills,
                sortOrder: this.state.filterModalSortValue
                  ? this.state.filterModalSortValue
                  : this.defaultSortOrder,
            },
        })
    }

    filterModalSkillTags = (skillList) => {
        this.setState({
            skills: skillList,
        })
    }

    filterModalSortDropdown = (event) => {
        this.setState({
            filterModalSortValue: event.currentTarget.value.toUpperCase(),
        })
    }

    filterModalJobStatusDropdown = (event) => {
        let value = []
        if(event.currentTarget.value === "OPEN & ONGOING") {
            value = event.currentTarget.value.replace(/ /g,'').split('&');
        } 
        else {
            value = [event.currentTarget.value.toUpperCase()];
        }
        this.setState({
            filterModalJobStatusValue: value,
        })
    }

    render () {

        let queryVariables = {}
        // If in Home page filter based on userskills or using the job filter modal
        if (this.props.location == 'home') {
            queryVariables = { filter: this.state.filter }
        }
        // Else get the query variables from the parent component
        else {
            queryVariables = this.props.queryVariables
        }

        if (this.props.query) {
            return (
              <Query query={this.props.query} variables={queryVariables}>
                  {({ loading, error, data }) => {
                      if (loading) return <LoadingIndicator/>;
                      if (error) return `Error! ${error}`
                      return (
                        <Fragment>
                            <Portal isOpen={this.state.filterModal}>
                                <ModalViewWithScrim>
                                    <FilterModal
                                      closeModal={this.closeFilterModal}
                                      sortDropdown={this.filterModalSortDropdown}
                                      jobStatusDropdown={this.filterModalJobStatusDropdown}
                                      getTagList={this.filterModalSkillTags}
                                      applyFilter={this.applyFilter}
                                      resetFilter={this.resetFilter}
                                      jobStatusValue={this.state.filterModalJobStatusValue}
                                      initialSkillsList={this.state.skills}
                                    />
                                </ModalViewWithScrim> 
                            </Portal>
                            <div className="cursor-default ">
                                <div className=" w-full mt-6 ">
                                    <h1
                                      className="text-2xl flex-1">{this.props.title}</h1>
                                    {this.props.title == explore
                                      ? <Options
                                        setModalState={this.openFilterModal}/>
                                      : ''}
                                    <hr/>
                                </div>
                                {
                                    data['allJobs'] ?
                                      data['allJobs'].map(data => {
                                          return (
                                            <JobCard data={data}/>
                                          )
                                      })
                                      :
                                      this.props.placeholder
                                }
                            </div>
                        </Fragment>
                      )
                  }}
              </Query>
            )
        }
        if (this.props.jobs && this.props.jobs.length > 0) {
            return (
              this.props.jobs.map(data => {
                  return (
                    <JobCard data={data}/>
                  )
              })
            )
        }

        console.log(this.props.placeholder)
        return (this.props.placeholder);
    }
}

const Options = (props) => {
    return (
      <div className="flex mt-4 h-12 w-full cursor-default">
          <div
            className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue"
            onClick={props.setModalState}>
              <h4 className="text-lg font-semi-bold pr-1">Filter Jobs</h4>
              <Icons.Filter
                className="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue"/>
          </div>
          <div className="flex-1"/>
          <Link to="/createJob"><Button label="Create a new Job"
                                        type="primary"/></Link>
      </div>
    )
}

export default JobList
