import {baseApi} from "./baseInstance";

export const sendFile = ({formData}) => {
    return baseApi.post('folder', {
        body: formData
    }).json();
};