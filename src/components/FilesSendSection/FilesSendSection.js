import React, {useContext, useState} from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import {sendFile} from "../../api/files";
import FilesZone from "../FilesZone/FilesZone";
import {ButtonsSection, FilesSendSectionWrapper, FormFieldsWrapper, FormPartSection} from "./styled";
import TextField from "@mui/material/TextField/TextField";
import {InfoTooltipServiceContext} from "../../contexts/InfoTooltipServiceContext";
import {SectionTitle} from "../commonStyled/SectionTitle";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Collapse from '@mui/material/Collapse';
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MODES = [
    {
        value: 0,
        name: 'Quick start'
    },
    {
        value: 1,
        name: 'Advanced'
    }
];

const IMAGE_PARSERS = [
    {
        value: 0,
        name: 'Tesseract'
    },
    {
        value: 1,
        name: 'Google Vision'
    },
    {
        value: 2,
        name: 'Abbyy FineReader'
    }
];

const VALIDATORS = [
    {
        value: 0,
        name: 'ExpressionInspector'
    },
    {
        value: 1,
        name: 'PhraseSense'
    }
];

const USAGE_LEVELS = [
    {
        value: 1
    },
    {
        value: 2
    },
    {
        value: 3
    },
    {
        value: 4
    },
    {
        value: 5
    },
];


export const FilesSendSection = () => {
    const [orgName, setOrgName] = useState('');

    const [files, setFiles] = useState([]);

    const [mode, setMode] = useState(MODES[0].value);
    const [imageParser, setImageParser] = useState(IMAGE_PARSERS[0].value);
    const [validator, setValidator] = useState(VALIDATORS[0].value);
    const [usageLevel, setUsageLevel] = useState(USAGE_LEVELS[0].value);


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

            <FormFieldsWrapper>
                <div>
                    <TextField label='Organization name'
                               variant='outlined'
                               type='text'
                               name='Organization name'
                               value={orgName}
                               sx={{
                                   width: '100%',
                                   marginBottom: '10px'
                               }}
                               onChange={(evt) => setOrgName(evt.target.value)}
                    />
                    <FilesZone files={files}
                               setFiles={handleFilesDrop}
                    />
                </div>

                <div>
                    <FormPartSection>
                        <FormControl>
                            <FormLabel id="radio-buttons-group-label">
                                Mode
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue={mode}
                                name="radio-buttons-group"
                                value={mode}
                                onChange={evt => setMode(evt.target.value)}
                                sx={{
                                    justifyContent: 'center'
                                }}
                            >
                                {
                                    MODES.map(m => (
                                            <FormControlLabel control={<Radio/>}
                                                              label={m.name}
                                                              key={m.value}
                                                              value={m.value}
                                            />
                                        )
                                    )
                                }
                            </RadioGroup>
                        </FormControl>
                    </FormPartSection>

                    <FormPartSection>
                        <Collapse in={+mode === MODES[1].value}>
                            <FormControl>
                                <FormLabel id="advanced-options-group-label">
                                    Advanced options
                                </FormLabel>
                                <div style={{display: 'flex', marginTop:'10px', gap: '10px', justifyContent: 'center'}}>
                                    <FormControl>
                                        <InputLabel id="image-parser-select-label">Image parser</InputLabel>
                                        <Select
                                            labelId="image-parser-select-label"
                                            value={imageParser}
                                            label="Image parser"
                                            onChange={(evt) => setImageParser(evt.target.value)}
                                        >
                                            {
                                                IMAGE_PARSERS.map(parser => <MenuItem key={parser.value} value={parser.value}>{parser.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel id="validator-select-label">Validator</InputLabel>
                                        <Select
                                            labelId="validator-select-label"
                                            value={validator}
                                            label="Validator"
                                            onChange={(evt) => setValidator(evt.target.value)}
                                        >
                                            {
                                                VALIDATORS.map(validator => <MenuItem key={validator.value} value={validator.value}>{validator.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <FormPartSection>
                                    <Box sx={{ width: 300 }}>
                                        <FormLabel id="usage-level-slider">
                                            Processing depth
                                        </FormLabel>
                                        <Slider
                                            aria-label="Custom marks"
                                            min={USAGE_LEVELS[0].value}
                                            max={USAGE_LEVELS[USAGE_LEVELS.length - 1].value}
                                            defaultValue={USAGE_LEVELS[0].value}
                                            getAriaValueText={(value) => value}
                                            step={null}
                                            value={usageLevel}
                                            onChange={(evt, newValue) => setUsageLevel(newValue)}
                                            valueLabelDisplay="auto"
                                            marks={USAGE_LEVELS}
                                            aria-labelledby="usage-level-slider"
                                        />
                                    </Box>
                                </FormPartSection>
                            </FormControl>
                        </Collapse>
                    </FormPartSection>
                </div>
            </FormFieldsWrapper>


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