import {SET_MY_PROFILE} from '../actions/types'

const adminReducer = (state = {

    myprofile:""

}, action) => {

    switch (action.type) {
        case SET_MY_PROFILE:
            state = {
                ...state,
                myprofile: action.payload
            };
            break;
        case "SET_USER_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "SELECTED_USER_DATA":
            state = {
                ...state,
                selectedUser: action.payload
            };
            break;

        case "SET_MODAL_STATUS":
            state = {
                ...state,
                boardAddModalShow: action.payload
            };
            break;
    }
    return state;
};

export default adminReducer;