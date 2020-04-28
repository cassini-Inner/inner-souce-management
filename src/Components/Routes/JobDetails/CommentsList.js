import React, { useRef, useState } from "react";
import Avatar from "../../Common/Avatar/Avatar";
import { GET_JOB_DISCUSSIONS } from "../../../queries";
import * as Icons from "react-feather";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import Button from "../../Common/Button/Button";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COMMENT, UPDATE_COMMENT } from "../../../mutations";

const CommentsList = (props) => {
    const { loading: discussionsLoading, error: discussionsError, data } = useQuery(
        GET_JOB_DISCUSSIONS, { variables: { jobId: props.jobId }, fetchPolicy: "cache-and-network" },
    );
    if (discussionsLoading) {
        return "Loading...";
    }
    if (discussionsError) console.log(`Error! ${discussionsError}`);
    console.log(data.Job.discussion.discussions);

    const commentsList = data.Job.discussion.discussions;
    if (commentsList) {
        return (commentsList.map((comment, key) => {
            return (<CommentItem key={key} comment={comment} user={props.user}
                jobId={props.jobId}/>);
        }));
    } else {
        return (<div>No Comments! </div>);
    }
};

const CommentItem = (props) => {
    const initialState = {
        editing: false,
    };
    const [state, updateState] = useState(initialState);

    const [updateComment, { loading: updateCommentLoading }] = useMutation(
        UPDATE_COMMENT,
        {
            refetchQueries: [
                {
                    query: GET_JOB_DISCUSSIONS,
                    variables: { jobId: props.jobId },
                },
            ],
        });
    const [deleteComment, { loading: deleteCommentLoading }] = useMutation(
        DELETE_COMMENT,
        {
            refetchQueries: [
                {
                    query: GET_JOB_DISCUSSIONS,
                    variables: { jobId: props.jobId },
                },
            ],
        });

    const comment = props.comment;
    const dateTimeStamp = new Date(comment.timeCreated);
    let dateTimeString = "on " + dateTimeStamp.toDateString();

    const textInputRef = useRef(comment.content);

    dateTimeString += " " + dateTimeStamp.toLocaleTimeString();

    const submitOnClick = (e) => {
        e.preventDefault();
        updateComment({
            variables: {
                commentId: comment.id,
                comment: textInputRef.current.value,
            },
            optimisticResponse: {},
        }).then(() => {
            updateState({ editing: false });
        }).catch(() => {
            alert("Error updating comment");
        });
    };

    const deleteOnClick = (e) => {
        e.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to delete the comment?");
        if (confirmed) {
            deleteComment({ variables: { commentId: comment.id } }).then(
                () => {
                    updateState({ editing: false });
                },
            ).catch(() => {alert("Error deleting comment");});
        }
    };

    const discardOnClick = (e) => {
        e.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to discard changes?");
        if (confirmed) {
            updateState({
                editing: false,
            });
        }
    };

    return <div
        className={"mt-2 flex w-full  transition duration-150 rounded-md " +
      (state.editing ? " shadow-md" : "   border-b border-nebula-grey-400 ")}>
        <div className="flex p-4 flex-row flex-auto items-start ">
            <Avatar imagePath={comment.createdBy.photoUrl}/>
            <div className="ml-4 flex-grow ">
                <p className="text-sm font-semibold text-nebula-grey-700">
                    {comment.createdBy.name}
                </p>
                <p className="text-xs text-nebula-grey-600">
                    {dateTimeString}
                </p>
                <div>
                    {
                        state.editing === true
                            ?
                            <form onSubmit={(e) => {
                                submitOnClick(e);
                            }}>
                                <TextAreaInput forwardedRef={textInputRef}
                                    rows={"5"}
                                    defaultValue={comment.content}
                                    value={null} className="w-full"/>
                                <div className="flex justify-between mt-2">
                                    <div>
                                        <Button type="submit"
                                            label={updateCommentLoading
                                                ? "Saving"
                                                : "Save"} className="mr-2"/>
                                        <Button type="secondary" label="Discard"
                                            onClick={(e) => discardOnClick(
                                                e)}/>

                                    </div>
                                    <Button type="error" label="Delete"
                                        onClick={(e) => deleteOnClick(e)}/>
                                </div>
                            </form>
                            :
                            <p
                                className="mt-1 text-nebula-grey-800 whitespace-normal break-words whitespace-pre-line">
                                {comment.content}
                            </p>
                    }
                </div>
            </div>
        </div>
        {comment.createdBy.id == props.user.id && !state.editing &&
        <div className="text-nebula-grey-500 mt-2">
            <button onClick={() => updateState({ editing: true })}>
                <Icons.Edit/>
            </button>
        </div>
        }
    </div>;
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(CommentsList);
