import {SET_NEWS, SELECTED_NEWS, SET_PROGRESS,SET_NEWS_ERROR} from '../actions/types'

export default function VideoReducer(state = {
    videos: [],
    news: [],
    selectedVideo: "",
    selectedNews: "",
    progress: 0,
    videoError:"",
    newsError:"",
    loader:false
}, action) {
    switch (action.type) {
        case SELECTED_NEWS:
            return state = {
                ...state,
                selectedNews: action.payload
            }
            break;
        case "SET_LOADER":
            return state = {
                ...state,
                loader: action.payload
            }
            break;
        case SET_PROGRESS:
            return state = {
                ...state,
                progress: action.payload
            };
            break;
        case SET_NEWS_ERROR:
            return state = {
                ...state,
                newsError: action.payload
            };
            break;
        case SET_NEWS:
            return state = {
                ...state,
                news: action.payload
            };
            break;
        default:
            return state;
    }
}