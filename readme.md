# Innersource 

## Problem statement
**To create a platform for people to innersource projects within an organisation along with a comprehensive project management system**

## Solution
*Innersource* is a platform for employees within an organisation to explore real world challenges beyond their current domains, allowing them to explore new skills and sharpen their existing ones. 

Additionally, it allows teams to collaborate with people past their departmental boundaries and explore new talent and instilling a culture of openness within the organisation. Innersourcing will enable teams to be more open about their processes, technologies, other knowledge.

## Core Functionalities
- Authentication with Github 
- Users can create Tasks/Jobs that other users can apply to 
- Post comments on a Task/Job 
- Users can explore jobs created by other ***Innersource*** members 
  - Filtering jobs based on skills and status
- Job creator has a granular control over the Job's progress and who works on it
- Allowing Users to work on the complete Job or a smaller set of Tasks  

## Project Plan
### Phase 1 - MVP
- Creating and Deleting Jobs ✅
- Applying to the whole Job ✅
- Accepting and rejecting applications on a Job ✅
- Filtering Jobs by skills and status ✅
- Managing status of individual Milestones in a Job, and the Job status ✅
- Enabling Discussions on Jobs with the functionality to Edit/Delete comments ✅

### Future feature consideration
- Comprehensive project management with functionality of several people working on a single Job
- Rewards for completing Jobs/Tasks that are decided by the Job creator
- Curated communities for skills/domains
- More flexibility in terms of Job creation, customised for specific domains

## Tech Stack
Since the essence of the POC was to explore new domains, we wanted to explore tech stacks that were a little unconventional. 
- *Backend*: The backend is comprised of a GraphQL API backed by a Golang 1.15 server. It is using Postgresql DB as the persistence layer. 
    The choice for Golang was for 2 main reasons.
    - The performance due to code being compiled to native binaries.
    - While being closer to C++ or C in terms of how it behaves, Go still has a garbage collector that removes the headache of managing memory.
    - *goroutines* provide a very simple but robust way of working with concurrency. In some instances it brought query times from 600ms down to 200ms.

    - The choice for GraphQL came out of necessity for fetching data within a single view, which would in turn require several roundtrips but can be done with GraphQL in a single API call. 
   
- *Frontend*: The frontend is a React SPA using Apollo Client to interact with the GraphQL end-point.
   - With GraphQL another added benefit was using Apollo as a GraphQL Client on the front-end that made state management relatively easier, while providing additional advantages such as caching.


## Architecture Diagram
