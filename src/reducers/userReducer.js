export default (state = {list: [], currentUser: {}, confirmedPartners: [], pendingPartners:[], partnerRequests: [], viewUser: {}}, action)=>{
    switch(action.type){
        case 'FETCH_USERS':
            return {...state, list: action.data}
        case 'FETCH_CURRENT_USER':
            return {...state, currentUser: action.data, confirmedPartners:action.data.confirmedPartners, pendingPartners:action.data.pendingPartners, partnerRequests: action.data.requestedPartners}
        case 'FETCH_USER_PROFILE':
            return{...state, viewUser: action.data }
        case 'EDIT_CURRENT_USER_INTERESTS':
            let newInterests = [...state.currentUser.interests, action.data]
            return {...state, currentUser:{ ...state.currentUser, interests: newInterests}}
        case 'EDIT_CURRENT_USER_GENDERS':
            return state
        case 'EDIT_CURRENT_USER_ORIENTATIONS':
            return state  
        case 'EDIT_CURRENT_USER_AGE':
            return state
        case 'EDIT_CURRENT_USER_PRONOUNS':
            return state  
        case 'EDIT_CURRENT_USER_NAME':
            return state
        case 'STORE_PENDING_PARTNER':
            let newPending = [...state.pendingPartners, action.data]
            return {...state, pendingPartners: newPending}
        case 'STORE_CONFIRMED_PARTNER':
            let newConfirmed = [...state.confirmedPartners, action.data]
            return {...state, confirmedPartners: newConfirmed}
        case 'CLEAR_USER':
            let cleanState = {list: [], currentUser: {}, confirmedPartners: [], pendingPartners:[], partnerRequests: [], viewUser: {}} 
            return cleanState
                    default:
            return state
    }
}