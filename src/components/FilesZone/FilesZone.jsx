import React, {useState} from 'react';
import FilesView from "./FilesView/FilesView";
import FilesCatcher from "./FilesCatcher/FilesCatcher";
import s from './FilesZone.module.css';
import {DragStatusContext} from "../../contexts/DragStatusContext";

const FilesZone = ({files, setFiles}) => {
    const [isDragStarted, setIsDragStarted] = useState(false);

    const handleDragEnter = () => {
        setIsDragStarted(true);
    };

    const handleDragLeave = () => {
        setIsDragStarted(false);
    };

    return (
        <DragStatusContext.Provider value={{
            isDragStarted,
            setIsDragStarted
        }}>
            <div className={s.wrapper}
                 onDragEnter={handleDragEnter}
                 onDragLeave={handleDragLeave}
            >
                <FilesView files={files}/>
                <FilesCatcher files={files} setFiles={setFiles}/>
            </div>
        </DragStatusContext.Provider>
    )
};

export default FilesZone;