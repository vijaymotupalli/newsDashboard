import {SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR} from '../actions/types'


export default function Loginreducer(state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
}, action) {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            return state = {
                ...state,
                isLoginPending:action.isLoginPending
            }
            break;
        case SET_LOGIN_SUCCESS:
            return state = {
                ...state,
                isLoginSuccess:action.isLoginSuccess
            }
            break;
        case SET_LOGIN_ERROR:
            return state = {
                ...state,
                loginError:action.loginError
            }

        default:
            return state;
    }
}