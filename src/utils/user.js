import cookie from 'js-cookie';
const usertoken='token'

export function getToken() {
    return cookie.get(usertoken);
}
export function setToken (data) {
    return cookie.set(usertoken,data);
}
export function removeToken() {
    return cookie.remove(usertoken);
}
export function setUsername (data) {
    return cookie.set('usrename',data);
}
export function getUsername() {
    return cookie.get('usrename');
}