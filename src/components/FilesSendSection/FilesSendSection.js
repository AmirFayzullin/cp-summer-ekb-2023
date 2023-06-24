import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {sendFile} from "../../api/files";
import FilesZone from "../FilesZone/FilesZone";
import {ButtonsSection, FilesSendSectionWrapper} from "./styled";
import TextField from "@mui/material/TextField/TextField";

export const FilesSendSection = () => {
    const [files, setFiles] = useState([]);
    const [orgName, setOrgName] = useState('');

    const handleChange = (evt) => {
        setFiles([evt.target.files[0]]);
    };

    const handleFilesDrop = (files) => {
        setFiles([files[0]])
    };

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('extra_name', orgName);

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
            <TextField label='Organization name'
                       variant='outlined'
                       type='text'
                       name='Organization name'
                       value={orgName}
                       onChange={(evt) => setOrgName(evt.target.value)}
            />
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