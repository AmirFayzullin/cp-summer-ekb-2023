import React, {useState, useEffect} from 'react';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import cn from 'classnames';
import s from './File.module.css';
import TrackChangesIcon from "@mui/material/SvgIcon/SvgIcon";
import {PrecisionBadge} from "../../../ProcessingSummarySection/styled";
import Tooltip from "@mui/material/Tooltip";

const File = ({file, onFileClick}) => {
    const MAX_NAME_LENGTH = 15;

    const [name, setName] = useState('');

    useEffect(() => {
        if (!file) return () => {
        };

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

    const hasPrec = file.precision >= 0;

    return (
        <div className={s.wrapper}
             onClick={handleFileClick}
        >
            <FolderZipIcon sx={{fontSize: '50px', color: '#f1c300'}}/>
            <p className={s.label}>
                {name}
            </p>

            {
                hasPrec &&
                    <Tooltip title="Precision">
                        <p className={s.label}>{file.precision}%</p>
                    </Tooltip>
            }

            <p className={cn(s.label, s.date)}>{file.lastModifiedDate.toLocaleString()}</p>
        </div>
    )
};

export default File;