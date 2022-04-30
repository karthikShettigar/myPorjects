
import { combineReducers } from "redux";

import { tasksReducer } from "./tasksReducer"

export const reducers = combineReducers(
    {
        tasksReducer,
    });