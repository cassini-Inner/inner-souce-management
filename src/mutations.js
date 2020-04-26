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

export const UPDATE_USER_PROFILE = gql`
    mutation ($userInput: UpdateUserInput) {
        updateProfile(user: $userInput){
            id
        }
    }
`;