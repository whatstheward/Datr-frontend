import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
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
            state = null
            return appReducer(state, action)
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

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['user', 'userDates']
}

const pReducer = persistReducer(persistConfig, appReducer)




export const store = createStore(
    pReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export const persistor = persistStore(store)