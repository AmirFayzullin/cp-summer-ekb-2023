import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {sendFile} from "../../api/files";
import FilesZone from "../FilesZone/FilesZone";
import {ButtonsSection, FilesSendSectionWrapper} from "./styled";

export const FilesSendSection = () => {
    const [files, setFiles] = useState([]);

    const handleChange = (evt) => {
        setFiles([evt.target.files[0]]);
    };

    const handleFilesDrop = (files) => {
        setFiles([files[0]])
    }

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('file', files[0]);

        sendFile({formData})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <FilesSendSectionWrapper>
            <FilesZone files={files}
                       setFiles={handleFilesDrop}
            />
            <ButtonsSection>
                <Button variant='contained'>
                    <label htmlFor='file-input'>
                        Add file
                        <input type="file"
                               id="file-input"
                               style={{display: "none"}}
                               onChange={handleChange}
                        />
                    </label>
                </Button>

                <Button variant='contained'
                        onClick={handleSubmit}
                >
                    send
                </Button>
            </ButtonsSection>
        </FilesSendSectionWrapper>
    )
};