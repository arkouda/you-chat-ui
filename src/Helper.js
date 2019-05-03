export var statify = (newState, state) => {
    for (var prop in state) {
        if(!newState.hasOwnProperty(prop))
            newState[prop] = state[prop];
    }
    return newState;
}