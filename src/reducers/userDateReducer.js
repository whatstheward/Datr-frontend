export default (state={currentDates:[]}, action)=>{
    switch(action.type){
        case "FETCH_USER_DATES":
            let newState = [] 
            action.data.user_dates.map(date => newState.push(date) )
            newState.sort((a,b)=>(a.time > b.time) ? 1 : ((b.time>a.time) ? -1 : 0))
            return {...state, currentDates: newState }
        case "DELETE_USER_DATE":
            let newCurrentDates = state.currentDates.filter(date=> date.id !== action.data)
            return {...state, currentDates: newCurrentDates}
        default:
            return state
    }
}