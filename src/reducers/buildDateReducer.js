export default (state={partners:"", dateTime: "", activities:[], interests:[]}, action)=>{
    switch(action.type){
        case "ADD_PARTNER":
            return {...state, partners: action.data}
        case "ADD_DATE_TIME":
            let newTime = new Date(action.data).toLocaleString()
            return {...state, dateTime: newTime}
        case "ADD_DATE_EVENT":
            debugger
            let newActivities = state.activities.concat(action.data)
            return {...state, activities: newActivities }
        case "REMOVE_EVENT":
            debugger
            let newEvents = state.activities.filter(event=>event.name !== action.data.name)
            return{...state, activities: newEvents}
        case "EDIT_DATE":
            let newState ={id: action.data.id, partners: action.data.partners, dateTime: action.data.time, activities: action.data.events, method: "PATCH"}
            return newState
        default:
            return state
    }
}