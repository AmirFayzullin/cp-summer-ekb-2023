import React, {useContext, useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import {sendFile} from "../../api/files";
import FilesZone from "../FilesZone/FilesZone";
import {ButtonsSection, FilesSendSectionWrapper} from "./styled";
import TextField from "@mui/material/TextField/TextField";
import {InfoTooltipServiceContext} from "../../contexts/InfoTooltipServiceContext";
import {SectionTitle} from "../commonStyled/SectionTitle";

export const FilesSendSection = () => {
    const [files, setFiles] = useState([]);
    const [orgName, setOrgName] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const {setState: setInfoTooltipState} = useContext(InfoTooltipServiceContext);

    const handleChange = (evt) => {
        setFiles([evt.target.files[0]]);
    };

    const handleFilesDrop = (files) => {
        setFiles([files[0]])
    };

    const resetForm = () => {
        setFiles([]);
        setOrgName('');
    };

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('extra_name', orgName);

        setIsLoading(true);

        sendFile({formData})
            .then(res => {
                setInfoTooltipState({
                    isOpen: true,
                    isSuccess: true,
                    message: 'Your .zip file was successfully uploaded!'
                });

                resetForm();
            })
            .catch(err => {
                console.log(err);
                setInfoTooltipState({
                    isOpen: true,
                    isSuccess: false,
                    message: 'Something went wrong'
                })
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <FilesSendSectionWrapper>
            <SectionTitle>
                Process new file
            </SectionTitle>

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
                <Button variant='contained'
                        endIcon={
                            <AddIcon/>
                        }
                >
                    <label htmlFor='file-input'>
                        {files.length === 0 ? 'Add file' : 'Another file'}
                        <input type="file"
                               id="file-input"
                               style={{display: "none"}}
                               onChange={handleChange}
                        />
                    </label>
                </Button>

                <LoadingButton variant='contained'
                               loading={isLoading}
                               loadingPosition='end'
                               disabled={files.length < 1 || orgName.length < 1 || isLoading}
                               onClick={handleSubmit}
                               endIcon={<CloudUploadIcon/>}
                >
                    {isLoading ? 'Uploading' : 'Upload'}
                </LoadingButton>
            </ButtonsSection>
        </FilesSendSectionWrapper>
    )
};