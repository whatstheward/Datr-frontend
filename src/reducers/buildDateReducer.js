export default (state={partners:[], dateTime: "", activities:[]}, action)=>{
    switch(action.type){
        case "ADD_PARTNER":
            return {...state, partners: action.data}
        case "ADD_DATE_TIME":
            return {...state, dateTime: action.data}
        default:
            return state
    }
}