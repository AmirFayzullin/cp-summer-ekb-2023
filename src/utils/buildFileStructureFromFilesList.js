const files = [
    {
        name: 'file.pdf',
        path: 'some/',
        id: '1234',
        errors: [{
            name: 'some error',
            page: 1,
            description: 'lorem lorem'
        }]
    },
];

const builtStructure = {
    isFolder: true,
    name: 'some',
    items: [
        {
            name: 'file.pdf',
            id: '1234',
            path: 'some/file.pdf',
            errors: [{
                name: 'some error',
                page: 1,
                description: 'lorem lorem'
            }]
        }
    ]
};

export const buildFileStructureFromFilesList = (files) => {
    const rootFolder = createFolder({name: '', path: ''});

    files.forEach(file => {
        addFile({
            root: rootFolder,
            path: file.path,
            file
        })
    });

    return rootFolder;
};

const createFolder = ({name, path, lastModifiedDate}) => ({
    isFolder: true,
    name,
    path,
    lastModifiedDate,
    id: (Math.random() * 10 ** 10).toFixed(0),
    items: []
});

const createFile = ({name, id, errors, path, lastModifiedDate}) => ({
    isFolder: false,
    name,
    id,
    errors,
    path,
    lastModifiedDate
});

const addFile = ({root, path, file}) => {
    const splittedPath = path.split('/');

    const nextFolderName = splittedPath[0];

    if (nextFolderName === "") {
        const createdFile = createFile(file);
        root.items.push(createdFile);
        return;
    }

    const nextFolder = root.items.find(item => item.isFolder && item.name === nextFolderName);

    if (nextFolder) {
        addFile({
            root: nextFolder,
            path: splittedPath.slice(1, path.length).join('/'),
            file
        });
    } else {
        const folder = createFolder({
            name: nextFolderName,
            path: root.path ? `${root.path}/${root.name}` : root.name,
            lastModifiedDate: file.lastModifiedDate
        });
        root.items.push(folder);
        addFile({root, path, file});
    }
};