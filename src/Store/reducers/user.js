import * as actions from "../actions";

const initialState = {
    id:"",
    name:"",
    photoUrl:"",
    githubUrl:"",
    token:"",
}

const userReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actions.SET_USER_DATA: return({
            id: action.payload.profile.id,
            name: action.payload.profile.githubName,
            photoUrl: action.payload.profile.photoUrl,
            githubUrl: action.payload.profile.githubUrl,
            token: action.payload.profile.token,
        });
    }

    return state;
}

export default userReducer;