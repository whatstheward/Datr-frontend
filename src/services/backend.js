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