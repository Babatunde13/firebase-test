const initState = {
    id: '',
    email: '',
    isAdmin: '',
    isLoading: false
}

const user = (state=initState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SIGNUP':
        case 'SIGNIN':
            return {...action.data, isLoading: false}
        case 'ISLOADING':
            return {...state, isLoading: true}
        case 'SIGNOUT':
            return initState
        default:
            return state;
    }
}

export default user