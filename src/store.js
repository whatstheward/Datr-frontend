import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import genderReducer from './reducers/genderReducer'
import orientationReducer from './reducers/orientationReducer'
import pronounReducer from './reducers/pronounReducer';
import interestReducer from './reducers/interestReducer'
import userReducer from './reducers/userReducer'
import sessionReducer from './reducers/sessionReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    gender: genderReducer,
    orientation: orientationReducer,
    pronoun: pronounReducer,
    interest: interestReducer,
    user: userReducer,
    session: sessionReducer
})


export const store = createStore(
    rootReducer, compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )