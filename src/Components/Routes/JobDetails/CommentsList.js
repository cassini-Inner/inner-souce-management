import React, { useRef, useState, useContext, useEffect, Fragment } from "react";
import Avatar from "../../Common/Avatar/Avatar";
import { GET_JOB_DISCUSSIONS } from "../../../queries";
import * as Icons from "react-feather";
import { useQuery } from "@apollo/client";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import Button from "../../Common/Button/Button";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COMMENT, UPDATE_COMMENT } from "../../../mutations";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ConfirmDialogue from "../../Common/ConfirmDialogue/ConfirmDialogue";

const CommentsList = ({ jobId }) => {
    const [comments, setComments] = useState([]);
    const { data, loading, error } = useQuery(
        GET_JOB_DISCUSSIONS,
        {
            variables: { jobId: jobId },
            onCompleted: (data) => {
                setComments(data.Job.discussion.discussions);
            },
        },
    );

    useEffect(() => {
        const prevComments = comments;
        const newComments = data != null ? data.Job.discussion.discussions : prevComments;
        setComments(newComments);
        return (() => { });
    }, [data]);

    const { user } = useContext(AuthenticationContext);

    if (comments) {
        return (
            <TransitionGroup
                component="ul"
            >
                {
                    comments.map((comment) => {
                        return (
                            <CSSTransition
                                key={comment.id}
                                timeout={200}
                                classNames={{
                                    enter: "opacity-0 transition duration-500",
                                    enterDone: "opacity-100 transition duration-500",
                                    exit: "opacity-0 transition duration-500",
                                }}
                            >
                                <li className="appearance-none">
                                    <CommentItem
                                        comment={comment}
                                        user={user}
                                        jobId={jobId}
                                    />
                                </li>
                            </CSSTransition>
                        );
                    })
                }
            </TransitionGroup>
        );
    } else {
        return (<div>No Comments! </div>);
    }
};

const CommentItem = (props) => {
    const initialState = {
        editing: false,
    };
    const [state, updateState] = useState(initialState);
    const { user } = useContext(AuthenticationContext);
    const [confirmDialogue, setConfirmDialogue] = useState({
        isOpen:false,
        title: "",
        msg: "",
        onConfirm: "",
    });
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
        if (textInputRef.current.value !== "") {
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
        }
    };

    const deleteOnClick = (e) => {
        e.preventDefault();
        const onConfirm = (confirmBool) => {
            setConfirmDialogue({
                isOpen: false,
                msg: "",
                onConfirm: "",
            });
            if(confirmBool) {
                deleteComment({ variables: { commentId: comment.id } }).then(
                    () => {
                        updateState({ editing: false });
                    },
                ).catch(() => { alert("Error deleting comment"); });
            }
        }
        setConfirmDialogue({
            isOpen: true,
            title:"Delete Comment?",
            msg: "Note that deleting a comment cannot be undone",
            onConfirm: onConfirm,
        });
    };

    const discardOnClick = (e) => {
        e.preventDefault();
        updateState({
            editing: false,
        });
    };

    return(
    <Fragment>
        <div
            className={"mt-2 flex w-full  transition duration-150 rounded-md " +
                (state.editing ? " shadow-md" : "   border-b border-nebula-grey-400 ")}>
            <div className="flex p-4 flex-row flex-auto items-start ">
                <Avatar className="h-8 w-8" imagePath={comment.createdBy.photoUrl} />
                <div className="ml-4 flex-grow ">
                    <p className="text-md font-medium text-nebula-grey-800">
                        {comment.createdBy.name}
                    </p>
                    <p className="text-sm text-nebula-grey-600">
                        { "Commented on " + dateTimeString}
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
                                        value={null} className="w-full" />
                                    <div className="flex justify-between mt-2">
                                        <div>
                                            <Button type="submit"
                                                label={updateCommentLoading
                                                    ? "Saving"
                                                    : "Save"} className="mr-2" />
                                            <Button type="secondary" label="Discard"
                                                onClick={(e) => discardOnClick(
                                                    e)} />

                                        </div>
                                        <Button type="error" label="Delete"
                                            onClick={(e) => deleteOnClick(e)} />
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
            {comment.createdBy.id == user.id && !state.editing &&
                <div className="text-nebula-grey-500 mt-2">
                    <button onClick={() => updateState({ editing: true })}>
                        <Icons.Edit />
                    </button>
                </div>
            }
        </div>
        <ConfirmDialogue isOpen={confirmDialogue.isOpen} title={confirmDialogue.title} msg={confirmDialogue.msg} onConfirm={confirmDialogue.onConfirm} />    
    </Fragment>);
};
export default (CommentsList);
