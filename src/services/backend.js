import jwt_decode from 'jwt-decode'

const API = 'http://obscure-dusk-20851.herokuapp.com'

export function getGenders(){
    return fetch(`${API}/genders`).then(res => res.json())
}

export function getOrientations(){
    return fetch(`${API}/orientations`).then(res => res.json())
}

export function getPronouns(){
    return fetch(`${API}/pronouns`).then(res => res.json())
}

export function getInterests(){
    return fetch(`${API}/interests`).then(res=>res.json())
}
export function getUsers(){
    return fetch(`${API}/users`).then(res => res.json())
}

export function searchUsers(query){
    return fetch(`${API}/user_search?query=${query}`,{
        method: 'GET',
        headers:{
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

export function createUser(user){
    return fetch(`${API}/users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })})
        
    }

export function loginUser(user){
    return fetch(`${API}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    }).then(res=>res.json())
}

export function getRandomDate(interests){
    let searchTerm = interests.split(' ').join('+')
    return fetch(`${API}/yelp_search?query=${searchTerm}`, {
        method: 'GET',
        headers:{
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
            }
        })
    .then(res => res.json())
}

export function getBusinessDetails(id){
    return fetch(`${API}/yelp_business_details?query=${id}`, {
        method: 'GET',
        headers:{
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
            }
        })
    .then(res => res.json())
}

export function getCurrentUser(token){
    const decodedToken = jwt_decode(token).user_id
        return fetch(`${API}/current_user/${decodedToken}`).then(res=>res.json())
}

export function getUserProfile(id){
    return fetch(`${API}/users/${id}}`, {
            method: 'GET',
            headers:{
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
        }).then(res=>res.json())
}



export function saveDatePlan(datePlan, method="POST"){
    if(method === "POST"){
    fetch(`${API}/user_dates`,{
        method: `${method}`,
        headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({datePlan})
    }).then(res => res.json()).then(data => {return data})
}else if(method==="PATCH"){
        let id = datePlan.id
        fetch(`${API}/user_dates/${id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({datePlan})
        }).then(res => res.json())
    }
}

export function getCurrentUserDates(id=jwt_decode(localStorage.token).user_id){
    return fetch(`${API}/user_dates?query=${id}`, {
        method: 'GET',
            headers:{
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
    }).then(res=> res.json())
}

export function deleteUserDate(id){
    fetch(`${API}/user_dates/${id}`, {
        method: 'DELETE',
            headers:{
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
    })
}
export function deleteUser(id){
    fetch(`${API}/users/${id}`, {
        method: 'DELETE',
            headers:{
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
                }
    }).then(res => res.json())
}

export function sendPartnerRequest(user, partner){
    fetch(`${API}/relationships`,{
        method: 'POST',
        headers:{
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({relationship: {user_id: user.id, partner_id: partner.id, confirmed: 0}})
    }).then(res=>res.json())
}

export function updatePartnerRequest(request, update){
    fetch(`${API}/relationships/${request.relationshipID}`,{
        method: 'PATCH',
        headers:{
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({relationship: {confirmed: update}})
    }).then(res=>res.json())
}
