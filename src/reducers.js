// in src create file called 'reducers.js'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case "GET_FRIENDS":
            return { ...state, friends: action.data };
        case "SEND_FRIEND_REQUEST":
            return { ...state, friends: action.data };
        case "ACCEPT_FRIEND_REQUEST":
            return {
                ...state,
                friends: state.friends.map(friend => {
                    if (friend.id == action.data) {
                        friend.accepted = true;
                    }
                    return friend;
                })
            };
        case "UNFRIEND":
            return {
                ...state,
                friends: state.friends.filter(
                    friend => friend.id != action.data
                )
            };
        case "GET_CHAT_HISTORY":
            return { ...state, messages: action.data };
        case "NEW_MESSAGE":
            return { ...state, messages: [...state.messages, action.data] };
        default:
            return state;
    }
}
