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

// To create job
export const CREATE_JOB = gql`
    mutation($job: CreateJobInput){
        createJob(job: $job) {
            id
            title
        }
    }
`;

// {
//     title:"Test mutation job",
//     desc:"Test mutations job desc",
//     difficulty:HARD,
//     milestones:[
//         {
//         title:"test milestones 1",
//         desc:"Test",
//         resolution:"lmao",
//         duration:"1",
//         status:OPEN,
//         skills:["lmao"]
//         },
//         {
//         title:"test milestones 2",
//         desc:"Test",
//         resolution:"lmao"
//         duration:"1",
//         status:OPEN,
//         skills:["nodejs", "react", "typescript", "newskill"]
//         }
//     ]
//     })