const timestamp = (state={}, action) => {
    switch (action.type) {
        case 'SIGNUP':
        case 'SIGNIN':
            return action.payload
        case 'SIGNOUT':
            return {}
        default:
            return state;
    }
}

export default timestamp