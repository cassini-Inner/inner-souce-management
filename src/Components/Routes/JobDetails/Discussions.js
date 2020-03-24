import React, { Fragment } from "react";
import { Comments } from "../../../../assets/placeholder";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";

const Discussions = () => {

    return(
        <Fragment>
            <AddComment />
            <Comment />
        </Fragment>
    );
};

const AddComment = () => {
    return(
        <div className = "my-6 flex-col w-full rounded py-5 px-4 border border-2 border-nebula-grey-400">
            <div className = "mb-6 font-semibold text-nebula-grey-600 text-lg">Add a new Comment</div>
            <TextInput placeholder = "Add comment" className = "mb-6 w-full" />
            <div className = "flex justify-end">
                <Button type = "primary" label = "Post Comment" />
            </div>
        </div>
    );
};

export const Comment = () => {
    
    return( Comments.map(({name, dateTime, comment}) => {
        return(
            <div className = "my-6 flex flex-row" key={name}>
                <img src="../assets/icons/Ellipse 3.png" className="flex-0 h-10 w-10 rounded-full" />
                <div className = "flex">
                    <div className = "flex flex-col ml-4 mb-4">
                        <div className = "text-lg font-semibold">{name}</div>
                        <div className = "text-sm text-nebula-grey-600">{dateTime}</div>
                        <p className="text-nebula-grey-700 text-sm">{ comment }</p>
                    </div>
                </div>
            </div>
        );
    }
    )
    );
};

export default Discussions;
