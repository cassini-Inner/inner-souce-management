import { gql } from "apollo-boost";

//To perform the authentication of the user login
export const AUTHENTICATE = gql`
    mutation authenticate($githubCode: String!) {
        authenticate(githubCode: $githubCode){
        profile{
            name
            githubUrl
            photoUrl
            bio
        }
        token
        }
    }
`;