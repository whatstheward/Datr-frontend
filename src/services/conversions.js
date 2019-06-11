export function getTimeFrom24Hour(str){
    let newTime = str.split('')
    newTime.splice(2, 0, ':')

    return newTime.join('')
}