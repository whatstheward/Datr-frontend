import jwt_decode from 'jwt-decode'

const API = 'http://localhost:3000'

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
    // .catch(console.log)
}

export function getRandomDate(interests){
    return fetch(`${API}/yelp_search?query=${interests}`)
    .then(res => res.json())
}

export function getBusinessDetails(id){
    return fetch(`${API}/yelp_business_details?query=${id}`)
    .then(res => res.json())
}

export function getCurrentUser(token){
    const decodedToken = jwt_decode(token)
        return fetch(`${API}/users/${decodedToken.user_id}`).then(res=>res.json())
}
