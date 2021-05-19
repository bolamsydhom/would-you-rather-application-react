const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('action', action);
    const returnedValue = next(action);
    console.log('state', store.getState());
    console.groupEnd();
    return returnedValue;
}

export default logger;
