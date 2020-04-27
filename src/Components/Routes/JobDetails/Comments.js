import React, { Fragment, useState } from "react";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import Avatar from "../../Common/Avatar/Avatar";
import * as Icons from "react-feather";
import { DELETE_COMMENT, UPDATE_COMMENT } from "../../../mutations";
import { useMutation } from '@apollo/client';

const Comments = (props) => {

    const initialState = {
        editCommentId: "",
        editedComment: "",
        comments: props.comments ? props.comments : [],
    }
    const [state, setState] = useState(initialState);

    //Delete Comment Mutation
    const [deleteCommentMutation, {loading:loading2, error:error2}] = useMutation(DELETE_COMMENT);
    if(loading2) return <p>Loading...</p>;
    if(error2) return <p>Delete comment mutation Error! {error2}</p>;

    //Update Comment Mutation
    const [updateCommentMutation, {loading, error}] = useMutation(UPDATE_COMMENT);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Update comment mutation Error! {error}</p>;
    
    const editCommentOnClick = (event) => {
        const commentId = parseInt(event.currentTarget.parentNode.id);
        setState({
            ...state,
            editCommentId: commentId,      //Function to get the comment using comment Id
            editedComment: state.comments.find((comment) => comment.id == commentId).content,
        });
    }

    const editCommentOnChangeHandler = (event) => {
        setState({
            ...state,
            editedComment: event.currentTarget.value
        });
    }

    const deleteComment = (event) => {
        console.log(event.currentTarget.parentNode.id)
        deleteCommentMutation({ 
            variables: { 
                commentId: parseInt(event.currentTarget.parentNode.id),
            } 
        }).then(res => 
                console.log(res),
            err => 
            console.log(err)
        );
    }

    const cancelEdit = () => {
        setState({
            ...state,
            editCommentId: "",
            editedComment: "",
        })
    }

    const saveEdit = () => {
        if(state.editedComment.trim().length) {
            updateCommentMutation({ 
                variables: { 
                    commentId: parseInt(state.editCommentId),
                    comment: state.editedComment,
                } 
            }). //Perform state update after success
            then(res => {
                    // const updatedComment = {                         //Function to get the comment using comment Id   
                    //     ...state.comments.find((comment) => comment.id == parseInt(state.editCommentId)),
                    //     content: state.editedComment,
                    // }
                    // const newComments = state.comments.filter((comment) => comment.id != updatedComment.id)
                    setState({
                        ...state,
                        // comments: [
                        //     ...newComments,
                        //     updatedComment
                        // ],
                        editCommentId: "",
                        editedComment: "",
                    })
                    },
                err => 
                    console.log(err)
            );
        }
        else {
            alert("Please enter a valid comment!");
        }
    }

    const editCommentButtonRow = 
        <Fragment>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={saveEdit}>
                <Icons.Edit className="text-nebula-blue mx-4" />Save 
            </div>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={cancelEdit}>
                <Icons.Edit className="text-nebula-red mx-4" />Cancel
            </div>
        </Fragment>;

    const buttonRow = 
        <Fragment>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={editCommentOnClick}>
                <Icons.Edit className="text-nebula-blue mx-4" />Edit
            </div>
            <div className="m-1 flex cursor-pointer hover:text-nebula-blue" onClick={deleteComment}>
                <Icons.Edit className="text-nebula-red mx-4" />Delete
            </div>
        </Fragment>;

    if(state.comments)
        return (
            state.comments.map((comment, key) =>{
                var dateTimeStamp = new Date(comment.timeCreated);
                var dateTimeString = "on " + dateTimeStamp.toDateString();
                dateTimeString += " " + dateTimeStamp.toLocaleTimeString();
                return (
                    <div className="border-b border-nebula-gray-400" key={ key }>
                        <div className = "mt-4 mb-2 flex">
                            <Avatar imagePath = { comment.createdBy.photoUrl }/>
                            <div className = "flex-col ml-4 mb-2 flex-1">
                                <div className = "text font-semibold">{ comment.createdBy.name }</div>
                                <div className = "text-xs text-nebula-grey-600 ">{ dateTimeString }</div>
                                {  
                                    state.editCommentId == comment.id
                                    ?
                                        <TextAreaInput id="editComment" onChange={editCommentOnChangeHandler} value={ state.editedComment }/>
                                    :
                                        <div className = "text-sm text-nebula-grey-700 ">{ comment.content }</div>
                                }
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

export default Comments;