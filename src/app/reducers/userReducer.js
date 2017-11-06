const userReducer = (state = {
    admins: [],error:"",adminDataClear:false,selectedAdmin:"",users:[],selectedUser:""
}, action) => {
    switch (action.type) {
        case "SET_ADMINS_DATA":
            state = {
                ...state,
                admins: action.payload
            };
            break;
        case "SET_USERS_DATA":
            state = {
                ...state,
                users: action.payload
            };
            break;
        case "SET_USER_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "SET_ADMIN_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "CLEAR_USER_DATA":
        state = {
            ...state,
            adminDataClear: action.payload
        };
        break;
        case "SELECTED_USER_DATA":
            state = {
                ...state,
                selectedUser: action.payload
            };
            break;
        case "SELECTED_ADMIN_DATA":
            state = {
                ...state,
                selectedAdmin: action.payload
            };
            break;
        
       
        
        
    }
    return state;
};

export default userReducer;