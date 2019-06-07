export default (state = {list: [], currentUser: {}}, action)=>{
    switch(action.type){
        case 'FETCH_USERS':
            return {...state, list: action.data}
        case 'FETCH_CURRENT_USER':
            return {...state, currentUser: action.data}
        default:
            return state
    }
}