export default (state = null, action) => {
    switch (action.type) {
        case 'select_library':
            return action.payload;
        default:
            return state; // reducer cannot return undefined state, so we need to make some default value
    }
};