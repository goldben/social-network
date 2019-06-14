// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case "GET_FRIENDS":
            return { ...state, friends: action.data };
        case "SEND_FRIEND_REQUEST":
            return { ...state, friends: action.data };
        case "ACCEPT_FRIEND_REQUEST":
            return { ...state, friend: action.data };
        case "UNFRIEND":
            return {
                ...state,
                friends: state.friends.filter(
                    friend => friend.id != action.data
                )
            };
        default:
            return state;
    }
}
