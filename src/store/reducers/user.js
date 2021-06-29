const initState = {
    id: '',
    email: '',
    isAdmin: ''
}

const user = (state=initState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SIGNUP':
        case 'SIGNIN':
            return action.data
        case 'SIGNOUT':
            return initState
        default:
            return state;
    }
}

export default user