// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case "FRIENDS":
            return { ...state, friends: action.data };
        case "ACCEPT_FRIEND_REQUEST":
            return { ...state, friend: action.data };
        case "UNFRIEND":
            return {
                ...state,
                friends: state.friends.filter(junk => action.data)
            };
        default:
            return state;
    }
}
