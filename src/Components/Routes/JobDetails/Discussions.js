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
    )
}

const AddComment = () => {
    return(
        <div className = "my-6 flex-col w-full rounded py-5 px-4 border border-2 border-nebula-grey-400">
            <div className = "mb-6 font-semibold text-nebula-grey-600 text-lg">Add a new Comment</div>
            <TextInput placeholder = "Add comment" className = "mb-6 w-full" />
            <div className = "flex justify-end">
                <Button label = "Post Comment" />
            </div>
        </div>
    );
}

export const Comment = () => {
    
    return( Comments.map(({name, dateTime, comment}) => {
            return(
                <div className = "my-6 flex-col">
                    <div className = "flex">
                        <img src="../assets/icons/Ellipse 3.png" className="flex-0 h-12 w-12 rounded-full" />
                        <div className = "flex-col ml-2 mb-2">
                            <div className = "text-lg font-semibold">{name}</div>
                            <div className = "text-nebula-grey-500">{dateTime}</div>
                        </div>
                    </div>
                    <div>{ comment }</div>
                </div>
                )
            }
        )
    );
}

export default Discussions;
