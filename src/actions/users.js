export function addUser(user){
    return{
        type: "ADD_USER", 
        username: user.username,
        password: user.password
    }
}