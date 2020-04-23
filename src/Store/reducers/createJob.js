import * as actions from "../actions";

const initialState = {
    milestoneValidation: false,
    jobValidation: false,
    job: {
        title:"",
        description: "",
        difficulty: "",
        milestones: [{
            title: "",
            description: "",
            duration: "",
            skills: [],
            resolutionMethod: ""
        }]
    }
}

const createJobReducer = (state = initialState, action) => {

    switch(action.type) {

        case actions.SET_CREATEJOB_JOBFIELDS: return({
            ...state,
            job: action.job,
        });

        case actions.SET_CREATEJOB_MILESTONEFIELDS: return({
            ...state,
            job:{
                ...state.job,
                milestones: action.milestones,
            },
        })

        case actions.SET_CREATEJOB_JOBVALIDATION: return({
            ...state,
            jobValidation: action.jobValidation,
        })

        case actions.SET_CREATEJOB_MILESTONEVALIDATION:  return({
            ...state,
            milestoneValidation: action.milestoneValidation,
        })

        case actions.CANCEL_CREATEJOB: return(initialState)
    }
    return state
}

export default createJobReducer;