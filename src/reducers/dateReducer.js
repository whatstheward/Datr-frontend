export default (state={list: [], viewedDates: []}, action)=>{
    switch (action.type){
        case "FETCH_BUSINESS":
            let newList = [...state.list, action.data]
            return {...state, list: newList.flat()}
        case "CLEAR_BUSINESSES":
            let freshList = []
            return {...state, list: freshList}
        case "ADD_DATE":
            let newDates = state.viewedDates.concat(action.data)
            return {...state, viewedDates: newDates}
        default:
            return state
    }
}