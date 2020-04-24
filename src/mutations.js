import { gql } from "apollo-boost";

//To perform the authentication of the user login
export const AUTHENTICATE = gql`
    mutation authenticate($githubCode: String!) {
        authenticate(githubCode: $githubCode){
        profile{
            id
            githubName
            githubUrl
            photoUrl
            bio
        }
        token
        }
    }
`;