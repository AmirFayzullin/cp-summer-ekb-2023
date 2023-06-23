import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {sendFile} from "../../api/files";

export const FilesSendSection = () => {
    const [file, setFile] = useState(null);

    const handleChange = (evt) => {
        setFile(evt.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('file', file);

        sendFile({formData})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <input type="file"
                   onChange={handleChange}
            />

            <Button variant='contained'
                    onClick={handleSubmit}
            >
                send
            </Button>
        </div>
    )
};