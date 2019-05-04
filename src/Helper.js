export var statify = (newState, state) => {
    for (var prop in state) {
        if(!newState.hasOwnProperty(prop))
            newState[prop] = state[prop];
    }
    return newState;
}
// const internalIp = require('internal-ip');
// const publicIp = require('public-ip');
// var ip = require('ip');

export var getIP = () => {
    // let ipPromise = await internalIp.v4();
    // return ipPromise.toString();
    return window.location.hostname;
}