import React, { Fragment, useState } from "react";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";
import { useQuery } from "@apollo/client";
import { GET_JOB_DISCUSSIONS } from "../../../queries";
import { connect } from "react-redux";
import { POST_COMMENT } from "../../../mutations";
import { useMutation } from '@apollo/client';
import Comments from "./Comments";

const Discussions = (props) => {

    //Load all Comments
    const { loading:loading3, error:error3, data } = useQuery(GET_JOB_DISCUSSIONS, { variables: { jobId: props.jobId } });
    if (loading3) return "Loading...";
    else if (error3) console.log(`Error! ${error3}`);

    return(
        <Fragment>
            <AddComment jobId = {props.jobId}  />
            <Comments 
                jobId = {props.jobId} 
                comments={ data["Job"]["discussion"]["discussions"] ? data["Job"]["discussion"]["discussions"] : [] } 
                { ...props } 
            />
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Discussions);
