import { createStore, combineReducers } from 'redux'
import genderReducer from './reducers/genderReducer'
import orientationReducer from './reducers/orientationReducer'
import pronounReducer from './reducers/pronounReducer';
import interestReducer from './reducers/interestReducer'
import userReducer from './reducers/userReducer'
import sessionReducer from './reducers/sessionReducer'
import dateReducer from './reducers/dateReducer'
import buildDateReducer from './reducers/buildDateReducer';
import userDateReducer from './reducers/userDateReducer';


const rootReducer = (state={}, action) =>{
    switch(action.type){
        case "LOG_OUT":
            let newState = {}
            return newState
        default:
            return state
    }
}

const appReducer = combineReducers({
    gender: genderReducer,
    orientation: orientationReducer,
    pronoun: pronounReducer,
    interest: interestReducer,
    user: userReducer,
    session: sessionReducer,
    date: dateReducer,
    buildDate: buildDateReducer,
    userDates: userDateReducer,
    root: rootReducer
})


export const store = createStore(
        appReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
