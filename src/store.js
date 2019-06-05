import { createStore, combineReducers } from 'redux'
import genderReducer from './reducers/genderReducer'
import orientationReducer from './reducers/orientationReducer'
import pronounReducer from './reducers/pronounReducer';

const rootReducer = combineReducers({
    gender: genderReducer,
    orientation: orientationReducer,
    pronoun: pronounReducer
})


export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())