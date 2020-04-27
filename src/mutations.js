import { gql } from "@apollo/client";

//To perform the authentication of the user login
export const AUTHENTICATE = gql`
    mutation authenticate($githubCode: String!) {
        authenticate(githubCode: $githubCode){
        profile{
            id
            name
            email
            githubName
            onboarded
            photoUrl
        }
        token
        }
    }
`;

// To update the user profile details
export const UPDATE_USER_PROFILE = gql`
    mutation ($userInput: UpdateUserInput) {
        updateProfile(user: $userInput){
            id
        }
    }
`;

// To create a new job
export const CREATE_JOB = gql`
    mutation($job: CreateJobInput){
        createJob(job: $job) {
            id
            title
        }
    }
`;

// To delete an existing job
export const DELETE_JOB = gql`
    mutation($jobId: ID!){
        deleteJob(jobID: $jobId) {
            id
            title
        }
    }
`;



// To delete a comment 
export const DELETE_COMMENT = gql`
    mutation($commentId: ID!){
        deleteCommment(id: $commentId) {
            id
        }
    }
`;

// To post a new 
export const POST_COMMENT = gql`
    mutation($comment: String!, $jobId: ID!){
        addCommentToJob(jobID: $jobId, comment: $comment) {
            id
        }
    }
`;

