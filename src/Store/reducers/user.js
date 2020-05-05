import * as actions from "../actions";

const initialState = {
    onboarded: false,
    id: "",
    name: "",
    githubName: "",
    photoUrl: "",
    email: "",
    githubUrl: "",
};


const userReducer = (state = initialState, action) => {

    switch(action.type) {

    case actions.SET_USER_DATA: return({
        onboarded: action.payload.profile.onboarded,
        id: parseInt(action.payload.profile.id), 
        name: action.payload.profile.name,
        email: action.payload.profile.email,
        githubName: action.payload.profile.githubName,
        photoUrl: action.payload.profile.photoUrl,
        githubUrl: action.payload.profile.githubUrl,
        
    });
    }

    return state;
};

export default userReducer;