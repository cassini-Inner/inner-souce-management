import React, { Component } from 'react';
import SplitContainer from '../SplitContainer';
import JobInformation from './JobInformation';
import { Button, Dropdown, SearchTags } from '../CommonComponents';
import MilestonesList from '../Milestones/MilestonesList';
import ApplyToMilestones from './ApplyToMilestones';
import App from '../App';

class JobDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: true,
    };
  }

  closeFilterModal = () => {
    this.props.setModalState({
      display: false,
    });
  };

  openFilterModal = () => {
    this.props.setModalState({
      display: true,
      header: this.getModalHeader(),
      content: this.getModalContent(),
      buttons: this.getModalButtons(),
    });
  };

  getModalHeader = () => {
    return (
      <h1 className="text-2xl">Select Milestones</h1>
    );
  };

  getModalButtons = () => {
    return (
      <div className="flex sticky bottom-0">
        {/* <div className="flex-1"></div> */}
        <div className="flex-1">
          <div className="flex">
            <Button type="secondary" label="Cancel" onClick={this.closeFilterModal}/>
            <div className="m-1"/>
            <Button type="primary" label="Apply Filter"/>
          </div>
        </div>
      </div>
    );
  };

  getModalContent = () => {
    const list = ['lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao','lmao', ];
    return (
      <ApplyToMilestones/>
    );
  };


  applyToMilestonesClickHandler() {
    this.openFilterModal();
  }

  applyToJobClickHandler() {

  }

  render() {
    const isEditMode = this.state.isEditMode;

    const actions = [
      (<Button type="secondary" label="Apply to Milestones"
               onClick={this.openFilterModal}
      />),
      (<Button type="primary" label="Apply to Job"
               onClick={this.applyToJobClickHandler}
      />),
    ];


    const statusWidget = (
      <div>
        <p>This is a title</p>
        <p>This is text</p>
      </div>
    );

    return (
      <SplitContainer
        leftView={< JobInformation/>}
        actions={actions}
        rightView={<MilestonesList/>}
        statusTitle="This is a title"
        statusSubtitle="This is a subtitle"
      />
    );
  }
}


export default JobDetailsPage;
