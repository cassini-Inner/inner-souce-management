import { gql } from 'apollo-boost';

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
                value
            }
            milestones {
                totalCount
                milestones{
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
            discussion{
                discussions{
                    id
                    content
                    createdBy{
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
            bio
            contact
            email
            photoUrl
            skills {
                value
            }
        }
    }
`;

// To get the applicants for a job
export const GET_JOB_APPLICANTS = gql`
    query($jobId: ID!) {
        Job(id: $jobId){
            applications {
                applications {
                    applicant {
                        name
                        id
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
                name
                department
                photoUrl
            }
            description: desc
            duration
            difficulty
            status
            skills {
                value
            }
            timeCreated
            milestones {
                totalCount
                milestones{
                    duration
                }
            }
        }
    }
`;
  