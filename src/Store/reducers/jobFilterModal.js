import * as actions from "../actions";

 const initialState = {
    skills:  ["nodejs", "spring", "react", "golang", "tableau"],
    sortOrder: "NEWEST",
    status: ["OPEN","ONGOING"],
}


const jobFilterReducer = (state = initialState, action) => {

    switch(action.type) {

        case actions.SET_JOB_FILTER: return({
                ...action.payload.filter
            });

        case actions.RESET_JOB_FILTER: return({
                ...initialState
            });
    
    }

    return state
}

export default jobFilterReducer;