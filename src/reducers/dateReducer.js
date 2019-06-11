export default (state={list: [], viewedDates: []}, action)=>{
    switch (action.type){
        case "FETCH_BUSINESS":
            return {...state, list: action.data}
        case "ADD_DATE":
            let newDates = state.viewedDates.concat(action.data)
            return {...state, viewedDates: newDates}
        default:
            return state
    }
}