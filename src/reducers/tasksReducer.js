const iniState = {
    tasks: [],
    error: null
}

export const tasksReducer = (state = iniState, action) => {
    switch (action.type) {
        case 'GET_TASKS_SUCCESS':
            return { ...state, tasks: action.payload };
        case 'GET_TASKS_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
