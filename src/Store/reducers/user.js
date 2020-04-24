import * as actions from "../actions";
import { getCookie } from "../../HelperFunctions/Cookies";


// const initialState = {
//     loggedIn: false,
//     id: getCookie("id"),
//     name: getCookie("name"),
//     githubName: "",
//     photoUrl: getCookie("photoUrl"),
//     githubUrl: "",
//     token: "",
// }

const initialState = {
    loggedIn: true,
    id: "2",
    name: "Arjun",
    githubName: "",
    photoUrl: "https://avatars3.githubusercontent.com/u/55799457?s=460&v=4",
    githubUrl: "",
    token: "",
}
const userReducer = (state = initialState, action) => {
    // switch(action.type) {
    //     case actions.USER_SIGN_IN: return({
    //         loggedIn: true,
    //         id: parseInt(action.payload.profile.id), //For Id to be integer
    //         githubName: action.payload.profile.githubName,
    //         photoUrl: action.payload.profile.photoUrl,
    //         githubUrl: action.payload.profile.githubUrl,
    //         token: action.payload.profile.token,
    //     });
    // }

    return state;
}

export default userReducer;