import React, {useState, useEffect} from 'react';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import s from './File.module.css';

const File = ({file, onFileClick}) => {
    const MAX_NAME_LENGTH = 10;

    const [name, setName] = useState('');

    useEffect(() => {
        if (!file) return () => {};

        // setName(truncName(file.name));
        setName(file.name);
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

    const handleFileClick = () => {
        if (!onFileClick) return;

        onFileClick(file);
    };

    return (
        <div className={s.wrapper}
             onClick={handleFileClick}
        >
            <FolderZipIcon sx={{fontSize: '50px'}}/>
            <p className={s.label}>{name}</p>
        </div>
    )
};

export default File;