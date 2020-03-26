import React, { Fragment } from "react";
import { Comments } from "../../../../assets/placeholder";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";
import Avatar from "../../Common/Avatar/Avatar";

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
            <div className="border-b border-nebula-gray-400" key="name">
                <div className = "mt-4 mb-2 flex">
                    <Avatar imagePath="../assets/icons/Ellipse 3.png"/>
                    <div className = "flex-col ml-4 mb-2 flex-1">
                        <div className = "text font-semibold">{name}</div>
                        <div className = "text-xs text-nebula-grey-600 ">{dateTime}</div>
                        <div className = "text-sm text-nebula-grey-700 ">{comment}</div>
                    </div>
                </div>
            </div>
        );
    }
    )
    );
};

export default Discussions;
