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
    .then(data => {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", data.user)
                // this.props.history.push('/')
    })
}

export function getCurrentUser(token){
    let id = jwt_decode(token).user_id
        return fetch(`${API}/users/${id}`).then(res=>res.json())
}
