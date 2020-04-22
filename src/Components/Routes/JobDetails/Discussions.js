import React, { Fragment } from "react";
import { Comments } from "../../../../assets/placeholder";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";
import Avatar from "../../Common/Avatar/Avatar";
import { useQuery } from "@apollo/react-hooks";
import { GET_JOB_DISCUSSIONS } from "../../../queries";

const Discussions = (props) => {

    return(
        <Fragment>
            <AddComment />
            <Comment jobId = {props.jobId} />
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

export const Comment = (props) => {

    const { loading, error, data } = useQuery(GET_JOB_DISCUSSIONS, { variables: { jobId: props.jobId } });
    if (loading) return "Loading...";
    else if (error) console.log(`Error! ${error.message}`);
    if(data["Job"]["discussion"]["discussions"])
        return (
            data["Job"]["discussion"]["discussions"].map((comment, key) =>{
                return (
                    <div className="border-b border-nebula-gray-400" key={ comment.id }>
                        <div className = "mt-4 mb-2 flex">
                            <Avatar imagePath = { comment.createdBy.photoUrl }/>
                            <div className = "flex-col ml-4 mb-2 flex-1">
                                <div className = "text font-semibold">{ comment.createdBy.name }</div>
                                <div className = "text-xs text-nebula-grey-600 ">{ comment.createdBy.timeCreated }</div>
                                <div className = "text-sm text-nebula-grey-700 ">{ comment.content }</div>
                            </div>
                        </div>
                    </div>
                );
            })     
        );
    else {
        return(<div>No comments</div>)
    }
};

export default Discussions;
