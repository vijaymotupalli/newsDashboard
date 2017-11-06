import {SET_LOCALITIES,SET_CATEGORIES,SET_COUNTRIES,SET_TYPES} from '../actions/types'

export default function VideoReducer(state = {
    categories: [],
    countries: [],
    types: [],
    localities: [],
}, action) {
    switch (action.type) {

        case SET_CATEGORIES:
            return state = {
                ...state,
                categories: action.payload
            };
            break;
        case SET_COUNTRIES:
            return state = {
                ...state,
                countries: action.payload
            };
            break;
        case SET_LOCALITIES:
            return state = {
                ...state,
                localities: action.payload
            };
            break;
        case SET_TYPES:
            return state = {
                ...state,
                types: action.payload
            };
            break;
        default:
            return state;
    }
}