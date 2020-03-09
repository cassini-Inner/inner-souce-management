import React, { Fragment, Component } from 'react';
import { milestones } from '../../../assets/placeholder';
import MilestoneCard from './MilestoneCard';
import JobDetails from "./JobContainer";

class JobDetailsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "isEditMode": true,
        }
    }



    render() {
        const isEditMode = this.state.isEditMode;
        return (
            < JobDetails ></JobDetails >
        );
    }
}

export default JobDetailsPage;