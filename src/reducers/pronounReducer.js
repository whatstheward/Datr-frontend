export default (state = {list: []}, action) => {
    switch (action.type){
     case 'FETCH_PRONOUNS':
         return {...state, list: action.data}
    default:
        return state
}
}