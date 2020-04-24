import { gql } from "@apollo/client";

//To perform the authentication of the user login
export const AUTHENTICATE = gql`
    mutation authenticate($githubCode: String!) {
        authenticate(githubCode: $githubCode){
        profile{
            onboarded
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