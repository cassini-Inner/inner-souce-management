import React, { Fragment, useState } from "react";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";
import Avatar from "../../Common/Avatar/Avatar";
import { useQuery } from "@apollo/client";
import { GET_JOB_DISCUSSIONS } from "../../../queries";
import { connect } from "react-redux";
import * as Icons from "react-feather";
import { POST_COMMENT, DELETE_COMMENT } from "../../../mutations";
import { useMutation } from '@apollo/client';

const Discussions = (props) => {

    //To refresh component on modificaitons
    const initialState = "reload";
    const [ state, setState ] = useState(initialState); 

    return(
        <Fragment>
            <AddComment jobId = {props.jobId} refresh={setState} />
            <Comment jobId = {props.jobId} refresh={setState} { ...props } />
        </Fragment>
    );
};

const AddComment = (props) => {

    const initialState = {
        comment: "",
    }
    const [state, setState] = useState(initialState);

    //Post Comment Mutation
    const [postCommentMutation, {loading, error}] = useMutation(POST_COMMENT);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Post comment mutation Error! {error}</p>;

    const onChangeHandler = (event) => {
        setState({
            comment:  event.currentTarget.value,
        });
    } 

    const postComment = () => {
        if(state.comment) {
            postCommentMutation({ 
                variables: { 
                    comment: state.comment,
                    jobId: props.jobId, 
                },
                options: {refetchQueries: [{ query: GET_JOB_DISCUSSIONS }]}
            }).then(res => 
                    console.log(res),
                err => 
                    console.log(err));
        }
        setState({
            comment:  "",
        });
        props.refresh("");
    }

    return(
        <div className = "my-6 flex-col w-full rounded py-5 px-4 border border-2 border-nebula-grey-400">
            <div className = "mb-6 font-semibold text-nebula-grey-600 text-lg">Add a new Comment</div>
            <TextInput id="addComment" placeholder = "Add comment" className = "mb-6 w-full" value={state.comment} onChange={onChangeHandler} />
            <div className = "flex justify-end">
                <Button type = "primary" label = "Post Comment" onClick={ postComment } />
            </div>
        </div>
    );
};

export const Comment = (props) => {

    const initialState = {
        editCommentId: "",
    }
    const [state, setState] = useState(initialState);

    //Delete Comment Mutation
    const [deleteCommentMutation, {loading:loading2, error:error2}] = useMutation(DELETE_COMMENT);
    if(loading2) return <p>Loading...</p>;
    if(error2) return <p>Delete comment mutation Error! {error2}</p>;
    
    //Load all Comments
    const { loading:loading3, error:error3, data } = useQuery(GET_JOB_DISCUSSIONS, { variables: { jobId: props.jobId } });
    if (loading3) return "Loading...";
    else if (error3) console.log(`Error! ${error3}`);

    const editComment = (event) => {
        setState({
            editCommentId: parseInt(event.currentTarget.parentNode.id),
        });
    }

    const deleteComment = (event) => {
        deleteCommentMutation({ 
            variables: { 
                commentId: parseInt(event.currentTarget.parentNode.id),
            } 
        }).then(res => 
                console.log(res),
            err => 
                alert(err)
        );
        props.refresh("");
    }

    const editCommentButtonRow = 
        <Fragment>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={editComment}>
                <Icons.Edit className="text-nebula-blue mx-4" />Save 
            </div>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={deleteComment}>
                <Icons.Edit className="text-nebula-red mx-4" />Cancel
            </div>
        </Fragment>;

    const buttonRow = 
        <Fragment>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={editComment}>
                <Icons.Edit className="text-nebula-blue mx-4" />Edit
            </div>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={deleteComment}>
                <Icons.Edit className="text-nebula-red mx-4" />Delete
            </div>
        </Fragment>;

    if(data["Job"]["discussion"]["discussions"])
        return (
            data["Job"]["discussion"]["discussions"].map((comment, key) =>{
                var dateTimeStamp = new Date(comment.timeCreated);
                var dateTimeString = "on " + dateTimeStamp.toDateString();
                dateTimeString += " " + dateTimeStamp.toLocaleTimeString();
                return (
                    <div className="border-b border-nebula-gray-400" key={ comment.id }>
                        <div className = "mt-4 mb-2 flex">
                            <Avatar imagePath = { comment.createdBy.photoUrl }/>
                            <div className = "flex-col ml-4 mb-2 flex-1">
                                <div className = "text font-semibold">{ comment.createdBy.name }</div>
                                <div className = "text-xs text-nebula-grey-600 ">{ dateTimeString }</div>
                                <div className = "text-sm text-nebula-grey-700 ">{ comment.content }</div>
                            </div>
                        </div>
                        {
                            comment.createdBy.id == props.user.id
                            ?
                                <div id="buttons" className="flex-row">
                                    <div id={comment.id} className="flex flex-wrap-reverse lg:flex-row-reverse">
                                        {  
                                            state.editCommentId == comment.id
                                            ?
                                                editCommentButtonRow
                                            :
                                                buttonRow
                                        }
                                    </div>
                                </div>
                            : ""
                            }
                    </div>
                );
            })     
        );
    else {
        return(<div>No comments</div>)
    }
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Discussions);
