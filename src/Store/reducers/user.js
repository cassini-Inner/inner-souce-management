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
            id: parseInt(action.payload.profile.id), //For Id to be integer
            githubName: action.payload.profile.githubName,
            photoUrl: action.payload.profile.photoUrl,
            githubUrl: action.payload.profile.githubUrl,
            token: action.payload.profile.token,
        });

        case actions.INIT_USER_REDUX: return({
            ...state,
            loggedIn: false,
            id: parseInt(action.payload.user.id), //For Id to be integer
            githubName: action.payload.user.githubName,
            token: action.payload.user.token,
        }); 
    }

    return state;
}

export default userReducer;