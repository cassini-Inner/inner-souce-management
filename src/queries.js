import { gql } from "@apollo/client";

// To get the milestones based on job id
export const GET_MILESTONES = gql`
    query($jobId: ID!){
        Job(id: $jobId){
            id
            status
            milestones {
                totalCount
                milestones{
                    id
                    timeCreated
                    title
                    description: desc
                    skills {
                        id                             
                        value
                    }
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
    query GET_JOB_DETAILS($jobId:ID!){
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
            applications {
                pendingCount
                acceptedCount
            }
            discussion {
                totalCount
            }
        }
    }
`;

// To get the discussions based on job id
export const GET_JOB_DISCUSSIONS = gql`
query ($jobId: ID!){
        Job(id:$jobId){
            id
            discussion{
                totalCount
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
            onboarded
            name
            githubName
            githubUrl
            department
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
            viewerHasApplied
            status
            applications {
                pendingCount
                acceptedCount
                applications {
                    status
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
            viewerHasApplied
            milestones {
                totalCount
                milestones{
                    id
                    duration
                }
            }
            applications {
                acceptedCount
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
                userJobStatus
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


// To get the number of milestones, applications, discussions and currently working for tabs and other info
export const GET_JOB_INFO = gql`
    query($jobId: ID!){
        Job(id: $jobId) {
            id
            viewerHasApplied 
            createdBy {
                id
            }
            milestones{
                totalCount
                milestones{
                    status
                }
            }
            discussion{
                totalCount
            }
            applications {
                acceptedCount
                pendingCount
                applications {
                    status
                    applicant{
                        id
                    }
                }
            }
        }
    }
`;

// To get the skills of the user for custon job feed
export const GET_USER_SKILLS = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            skills {
                id
                value
            }
        }
    }
`;

// To check if onboarding is done already
export const GET_USER_ONBOARDED = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            onboarded
        }
    }
`;

// To get your jobs 
export const GET_YOUR_JOBS = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            appliedJobs {
                applicationStatus
                userJobStatus
                job {
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
                    applications {
                        acceptedCount
                    }
                    timeCreated
                    viewerHasApplied
                    milestones {
                        totalCount
                        milestones{
                            id
                            duration
                            status
                        }
                    }
                }
            }
        }
    }
`;


// To get created jobs 
export const GET_CREATED_JOBS = gql`
    query($userId: ID!){
        User(id: $userId){
            id
            createdJobs {    
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
                applications {
                    acceptedCount
                    pendingCount
                    applications {
                        id
                        status
                        applicant {
                            id
                            photoUrl
                        }
                    }
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
    }
`;

export const GET_SKILLS_SUGGESTIONS = gql`
    query($query: String!) {
        Skills(query: $query){
            value
        }
    }
`;

// To get all the job details based on job id for edit 
export const GET_EDIT_JOB_DETAILS = gql`
    query GET_EDIT_JOB_DETAILS($jobId:ID!){
        Job(id:$jobId){
            id
            title
            description: desc 
            difficulty
            milestones {
                totalCount
                milestones{
                    id
                    title
                    description: desc
                    duration
                    resolution
                    skills {
                        id
                        value
                    }
                }
            }
        }
    }
`;

export const SEARCH_JOBS_USERS_LIMIT = gql`
  query ($query: String!, $limit: Int!) {
       Search(query: $query, limit: $limit) {
            jobs{
                id
                title
                status
                viewerHasApplied
                description: desc
            }
            users {
                id
                name
                role
                department
                photoUrl
            }   
       }
  }
`;

//Get all jobs with filter -  paginated 
export const GET_PAGINATED_JOBS_FILTER = gql`
    query Jobs($filter: JobsFilterInput, $limit: Int!, $after: ID) {
        Jobs(filter: $filter, limit: $limit, after: $after) {
            totalCount
            pageInfo {
                hasNextPage
            }
            allJobs: edges {
                cursor
                Job: node {
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
                    viewerHasApplied
                    milestones {
                        totalCount
                        milestones{
                            id
                            duration
                        }
                    }
                    applications {
                        acceptedCount
                    }
                }
            }
        }
    }
`;