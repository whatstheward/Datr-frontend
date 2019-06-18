export default (state={partners:"", dateTime: "", activities:[], interests:[]}, action)=>{
    switch(action.type){
        case "ADD_PARTNER":
            return {...state, partners: action.data}
        case "ADD_DATE_TIME":
            let newTime = new Date(action.data)
            let dateTime = newTime.getMonth()+1 +'-'+newTime.getDate()+'-'+newTime.getFullYear()
            return {...state, dateTime: dateTime}
        case "ADD_DATE_EVENT":
            let newActivities = state.activities.concat(action.data)
            return {...state, activities: newActivities }
        case "REMOVE_EVENT":
            let newEvents = state.activities.filter(event=>event.name !== action.data.name)
            return{...state, activities: newEvents}
        case "EDIT_DATE":
            let newState ={id: action.data.id, partners: action.data.partners, dateTime: action.data.time, activities: action.data.events, method: "PATCH"}
            return newState
        case "SAVE_DATE":
            let cleanState = {partners:"", dateTime: "", activities:[], interests:[]}
            return cleanState
        default:
            return state
    }
}