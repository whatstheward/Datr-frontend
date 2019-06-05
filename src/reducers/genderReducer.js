
export default (state = {list: []}, action) => {
    switch (action.type){
     case 'FETCH_GENDERS':
         return {...state, list: action.data}
    default:
        return state
}
}