var initialState = {
    username: "",
    profile_pic: "",
}

module.exports = {
    reducer: (state = initialState, action) => {
        switch(action.type) {
            case "UPDATE_USER":
                return {
                    username: action.payload.username,
                    profile_pic: action.payload.profile_pic
                }
            case "LOGOUT": return {
                username: "",
                profile_pic: ""
            }

            default:
                return state;
        }
    },

    updateUser: (user) => {
        return {
            type: "UPDATE_USER",
            payload: {
                username: user.username,
                profile_pic: user.profile_pic
            }            
        }
    },

    logout: () => {
        return {
            type: "LOGOUT"
        }
    }
}