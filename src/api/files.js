import {baseApi} from "./baseInstance";

export const sendFile = ({formData}) => {
    return baseApi.post('folder', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).json();
};

export const getFiles = ({page}) => {
    return baseApi.get(`folder?page=${page}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).json();
};