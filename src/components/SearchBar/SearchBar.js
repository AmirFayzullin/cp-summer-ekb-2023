import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import {SearchBarWrapper} from "./styled";
import Button from "@mui/material/Button";
import {useState} from "react";

export const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('');

    return (
        <SearchBarWrapper>
            <TextField
                placeholder='Search...'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                value={name}
                onChange={evt => setName(evt.target.value)}
                variant='outlined'
            />
            <Button variant='contained'
                    onClick={() => onSearch({name})}
            >
                Search
            </Button>
        </SearchBarWrapper>
    )
};