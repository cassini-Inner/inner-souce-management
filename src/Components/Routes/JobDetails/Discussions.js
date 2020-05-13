import React, { Fragment, useRef, useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import { useMutation } from "@apollo/react-hooks";
import { GET_JOB_DISCUSSIONS } from "../../../queries";
import { POST_COMMENT } from "../../../mutations";
import CommentsList from "./CommentsList";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { useQuery } from "@apollo/client";

const Discussions = (props) => {


    return (
        <Fragment>
            <AddComment jobId={props.jobId} />
            <CommentsList jobId={props.jobId} />
        </Fragment>
    );
};

const AddComment = (props) => {
    const commentInputRef = useRef(null);
    //Post Comment Mutation
    const [postCommentMutation, { error }] = useMutation(POST_COMMENT,
        {
            refetchQueries: [
                {
                    query: GET_JOB_DISCUSSIONS,
                    variables: { jobId: props.jobId }
                },
            ],
        });
    if (error) return <p>Post comment mutation Error! {error}</p>;

    const postComment = () => {
        if (commentInputRef.current.value !== "") {
            postCommentMutation({
                variables: {
                    comment: commentInputRef.current.value,
                    jobId: props.jobId,
                }
            }).catch((e) => {
                alert("Error adding comment: ", e);
            });
        }
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            postComment();
        }}>
            <div
                className="my-6 flex-col w-full rounded py-5 px-4 border border-2 border-nebula-grey-400">
                <div
                    className="mb-6 font-semibold text-nebula-grey-600 text-lg">Add
                    a new Comment
                </div>
                <TextAreaInput forwardedRef={commentInputRef} id="addComment"
                    placeholder="Add comment" className="mb-6 w-full" />
                <div className="flex justify-end">
                    <Button type="submit" label="Post Comment" />
                </div>
            </div>
        </form>
    );
};

export default (Discussions);
