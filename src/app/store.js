import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import Login from "./reducers/loginReducer";
import Videos from "./reducers/videoReducer";
import Admin from "./reducers/adminReducer";
import Data from "./reducers/dataReducer";
import User from "./reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(
    combineReducers({
        Login,Videos,Admin,Data,User
    }),
    {},
    composeEnhancers(
        applyMiddleware(thunk,logger()))

);