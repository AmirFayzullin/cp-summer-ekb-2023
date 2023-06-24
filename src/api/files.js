import {baseApi} from "./baseInstance";

export const sendFile = ({formData}) => {
    return baseApi.post('folder', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    }).json();
};


export const getFolders = ({page}) => {
    return baseApi.get(`folders?page=${page}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).json();
};

export const getFolderFiles = ({folderId}) => {
    return baseApi.get(`folders/${folderId}/files`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).json();
};