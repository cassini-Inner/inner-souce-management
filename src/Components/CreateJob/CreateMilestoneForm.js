import React from "react";
import TextInput from '../CommonComponents';

const getMilestoneForm = (props) => {
    let title = <h1 className = "text-2xl">Milestone #{ props.milestoneNo }</h1>;
    let body = 
    <div className = "flex flex-col mr-32">
        <h2 className = "font-semibold" >Title</h2>
        <TextInput placeholder = "Title of this Milestone" className = "my-2 w-full" />
    </div>
}

export default getMilestoneForm;