export default (state = {token: !!localStorage.getItem('token')}, action)=>{
    switch(action.type){
        case "LOG_IN":
            return {...state, token: action.data}
        case "LOG_OUT":
            return {...state, token: action.data}
        default:
            return state
    }
}