import * as actionType from '../actions';

const initialState = {
    display: false,
    type: "",
    payload: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.OPEN_MODAL : return { display: true, type: action.modalType, payload: action.payload ? action.payload : {} } 
        case actionType.CLOSE_MODAL : return { display: false, type: "",  payload: {}}
    }
    return state;
}   

export default reducer;