import {baseApi} from "./baseInstance";

export const sendFile = ({formData}) => {
    return baseApi.post('folder', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).json();
};