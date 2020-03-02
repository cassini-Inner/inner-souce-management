import React, { Component } from 'react';
import OngoingJobs from '../YourJobs/OngoingJobs';

class Content extends Component {
    render() {
        return(
            <div className="h-auto ml-10 mt-4">
                <OngoingJobs />
            </div>
        );
    }
}

export default Content;