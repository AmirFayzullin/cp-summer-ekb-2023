import React, {useState, useEffect} from 'react';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import s from './File.module.css';

const File = ({file}) => {
    const MAX_NAME_LENGTH = 10;

    const [src, setSrc] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (!file) return () => {};

        readFile(file);

        setName(truncName(file.name));
    }, [file]);

    const getExt = (name) => {
        const regexp = /.[a-zA-Z0-9]*$/
        return regexp.exec(name)[0];
    };

    const getName = (name) => {
        const ext = getExt(name);
        return name.replace(ext, '');
    };

    const truncName = (name) => {
        let truncatedName = getName(name);
        const ext = getExt(name);
        if (truncatedName.length > MAX_NAME_LENGTH) {
            truncatedName = truncatedName.slice(0, MAX_NAME_LENGTH) + "..";
        }

        return truncatedName + ext;
    };

    const readFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setSrc(e.target.result)
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className={s.wrapper}>
            <FolderZipIcon sx={{fontSize: '50px'}}/>
            <p className={s.label}>{name}</p>
        </div>
    )
};

export default File;