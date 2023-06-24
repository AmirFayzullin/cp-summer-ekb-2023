import {baseApi} from "./baseInstance";

export const register = async ({name, email, password}) => {
    const res = await baseApi.post('auth/register', {
        json: {name, email, password}
    }).json();

    localStorage.setItem('token', res.authorisation.token);

    return res.user;
};

export const login = async ({email, password}) => {
    const res = await baseApi.post('auth/login', {
        json: {email, password}
    }).json();

    localStorage.setItem('token', res.authorisation.token);

    return res.user;
};

export const checkToken = async ({token}) => {
    const res = await baseApi.post('auth/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json();

    return res.user;
};