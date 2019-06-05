export default (state = {list: []}, action) => {
    switch (action.type){
     case 'FETCH_ORIENTATIONS':
         return {...state, list: action.data}
    default:
        return state
}
}