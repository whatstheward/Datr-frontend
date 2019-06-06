import { createStore, combineReducers } from 'redux'
import genderReducer from './reducers/genderReducer'
import orientationReducer from './reducers/orientationReducer'
import pronounReducer from './reducers/pronounReducer';
import interestReducer from './reducers/interestReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    gender: genderReducer,
    orientation: orientationReducer,
    pronoun: pronounReducer,
    interest: interestReducer,
    user: userReducer
})


export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())