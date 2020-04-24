import * as actions from "../actions";

const initialState = {
    loggedIn: false,
    id: "",
    name: "",
    githubName: "",
    photoUrl: "",
    githubUrl: "",
    token: "",
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.USER_SIGN_IN: return({
            loggedIn: true,
            id: action.payload.profile.id,
            githubName: action.payload.profile.githubName,
            photoUrl: action.payload.profile.photoUrl,
            githubUrl: action.payload.profile.githubUrl,
            token: action.payload.profile.token,
        });
    }

    return state;
}

export default userReducer;