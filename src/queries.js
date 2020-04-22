import { gql } from "apollo-boost";

// To get the milestones based on job id
export const GET_MILESTONES = gql`
    query($jobId: ID!){
        Job(id: $jobId){
            id
            milestones {
                totalCount
                milestones{
                    id
                    title
                    description: desc
                    status
                    duration
                    resolution
                }
            }
        } 
    }
`;

// To get the job details based on job id
export const GET_JOB_DETAILS = gql`
    query($jobId:ID!){
        Job(id:$jobId){
            id
            title
            createdBy {
                id
                name
                department
                photoUrl
            }
            description: desc 
            duration 
            difficulty
            status 
            timeCreated  
            skills {
                id
                value
            }
            milestones {
                totalCount
                milestones{
                    id
                    duration
                }
            }
        }
    }
`;

// To get the discussions based on job id
export const GET_JOB_DISCUSSIONS = gql`
query($jobId: ID!){
        Job(id:$jobId){
            id
            discussion{
                discussions{
                    id
                    content
                    createdBy{
                        id
                        name
                        photoUrl
                    }
                    timeCreated
                }
            }
        }
    }
`;

// To get the user profile with user id
export const GET_USER_PROFILE = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            name
            role
            bio
            contact
            email
            photoUrl
            skills {
                id
                value
            }
        }
    }
`;

// To get the applicants for a job
export const GET_JOB_APPLICANTS = gql`
    query($jobId: ID!) {
        Job(id: $jobId){
            id
            applications {
                applications {
                    applicant {
                        id
                        name
                        role
                        photoUrl
                    }
                    status
                }      
            }	
        }
    }
`;

// To get all the jobs based filter
export const GET_ALL_JOBS_FILTER = gql`
    query allJobs($filter: JobsFilterInput) {
        allJobs(filter: $filter) {
            id
            title
            createdBy {
                id
                name
                department
                photoUrl
            }
            description: desc
            duration
            difficulty
            status
            skills {
                id
                value
            }
            timeCreated
            milestones {
                totalCount
                milestones{
                    id
                    duration
                }
            }
        }
    }
`;
  
// To get the ongoing jobs of a user based on user id
export const GET_USER_ONGOING_JOBS = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            appliedJobs{
                applicationStatus
                job{
                    id
                    title
                    createdBy {
                        id
                        name
                        department
                        photoUrl
                    }
                    status
                    timeCreated
                    milestones {
                        totalCount
                        milestones{
                            id
                            status
                        }
                    }
                }
            }
        }
    }
`;