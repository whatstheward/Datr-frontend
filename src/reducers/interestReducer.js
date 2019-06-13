export default (state = {list: []}, action)=>{
    switch(action.type){
        case 'FETCH_INTERESTS':
            return {...state, list: action.data.interests}
        default:
            return state
    }
}