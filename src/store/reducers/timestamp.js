let initState = [
    {
        email: '',
        timestamp: ''
    }
]

const timestamp = (state=initState, action) => {
    switch (action.type) {
        case 'GET_TIMESTAMPS':
            return action.data
        case 'ADD_TIMESTAMP':
            return [action.payload, ...state]
        case 'EDIT_TIMESTAMP':
            return state.map(timestamp => timestamp.id === action.payload.id? action.payload : timestamp)
        case 'DELETE_TIMESTAMPS':
            return state.filter(timestamp => timestamp.id !== action.payload.id)
        default:
            return state;
    }
}

export default timestamp