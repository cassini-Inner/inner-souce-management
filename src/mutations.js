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
            name
            email
            githubName
            onboarded
            photoUrl
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

// To post a new 
export const POST_COMMENT = gql`
    mutation($comment: String!, $jobId: ID!){
        addCommentToJob(jobID: $jobId, comment: $comment) {
            id
        }
    }
`;

// To delete a comment 
export const DELETE_COMMENT = gql`
    mutation($commentId: ID!){
        deleteComment(id: $commentId) {
            id
        }
    }
`;

// to accept a job application
export const ACCEPT_JOB_APPLICATION = gql`
    mutation($applicantId: ID!, $jobId: ID!, $note: String!) {
        updateJobApplication(
            applicantID: $applicantId
            jobID: $jobId
            status: ACCEPTED
            note: $note
          ) {
            id
          }
    }
`;

// to reject a job application
export const REJECT_JOB_APPLICATION = gql`
    mutation($applicantId: ID!, $jobId: ID!, $note: String!) {
        updateJobApplication(
            applicantID: $applicantId
            jobID: $jobId
            status: REJECTED
            note: $note
          ) {
            id
          }
    }
`;

// To update a comment
export const UPDATE_COMMENT = gql`
    mutation($comment: String!, $commentId: ID!){
        updateComment(id: $commentId, comment: $comment) {
            id
        }
    }
`;

// To create a job application
export const APPLY_TO_JOB = gql`
    mutation($jobId: ID!){
        createJobApplication(jobID: $jobId) {
            id
        }
    }
`;

// To withdraw a job application
export const WITHDRAW_JOB_APPLICATION = gql`
    mutation($jobId: ID!){
        deleteJobApplication(jobID: $jobId) {
            id
        }
    }
`;

// To toggle milestone as completed
export const TOGGLE_MILESTONE_COMPLETED = gql`
    mutation($milestoneId: String!){
        toggleMilestoneCompleted(milestoneID: $milestoneId) {
            id
            status
            assignedTo {
                id
            }
        }
    }
`;

export const MARK_NOTIFICATION_READ = gql`
mutation MarkOneNotificationRead($ids: [ID!]!){
  markViewerNotificationsRead(ids:$ids){
    id
    read
  }
}
`;

export const MARK_ALL_NOTIFICATIONS_READ = gql`
mutation MarkAllNotificationsRead{
  markAllViewerNotificationsRead{
    id
    timeCreated
    type
    read
  }
}
`;

// To toggle job as completed
export const TOGGLE_JOB_COMPLETED = gql`
    mutation($jobId: String!){
        toggleJobCompleted(jobID: $jobId) {
            id
            status
        }
    }
`;

// To update a job
export const UPDATE_JOB = gql`
    mutation($job: UpdateJobInput){
        updateJob(job: $job) {
            id
        }
    }
`;

// To restore jobs backup
export const RESTORE_JOBS_BACKUP = gql`
    mutation($jobs: [CreateJobInput!]!){
        restoreJobsBackup(jobs: $jobs) {
            id
        }
    }
`;

export const CREATE_REVIEW_MUTATION = gql`
    mutation CreateReview($review: ReviewInput!, $milestoneId: ID!) {
        createMilestonePerformanceReview(review: $review, milestoneId: $milestoneId) {
            id
            rating
            createdFor {
                name
                id
            }
        }
    }
`;

export const UPDATE_REVIEW_MUTATION = gql`
    mutation  UpdateReview($review: ReviewInput!, $id: ID!) {
        updateMilestonePerformanceReview(review:$review, id: $id) {
            id
            rating
            createdFor {
                id
                name
            }
            remark
        }
    }
`;
