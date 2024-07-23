---
title: 'File & Blob'
date: 2024-07-23
tags: ['javascript']
type: 'DefaultDocument'
---

## 基本概念

```js
const blob = new Blob(['data'], 'type');
const file = new File(['data'], 'fileName', 'type')

console.log( await blob.arrayBuffer() );
console.log( await file.arrayBuffer() );

const fileReader = new FileReader();
fileReader.onload = (e) => {
    console.log(fileReader.result)
    console.log(e.target.result);
}
fileReader.readAsArrayBuffer(file);

const dataView = new DataView( await blob.arrayBuffer())
console.log(dataView);
console.log(dataView.getUint8(1));
dataView.setUint8(1, 65)

```

* `file` 的原型其实是 `Blob` , 只不过多了文件名 , 数据层面是相同的

* `arrayBuffer()` 返回 `Promise`  , 需要通过 `await` 调用

* 对于 `FileReader` 构造函数来说 , `e.target` 就是 `fileReader` , 所以 `e.target.result` 就是 `fileReader.result` , 都还是 `ArrayBuffer`

* 对于 `DataView` 构造函数来说 , `getUint8(number)` , 表示获取第 `number` 个字节的内容
`setUint8(number , value)` , 表示设置第 `number` 个字节的内容为 `value`

## 打开文件

```jsx
const openFile = () => {
    const onFileChange = async (e) => {
        console.log(e.target.files)
        console.log(e.target.files[0])
        console.log(await e.target.files[0].arrayBuffer())
    }

    return (
        <input type="file" onChange={onFileChange} />
    )
}

const dragFile = () => {
    const dragOver = (e) => {
        e.preventDefault()
    }

    const drop = async (e) => {
        e.preventDefault()
        console.log('files', e.dataTransfer.files);
        console.log(e.dataTransfer.files[0]);
        console.log(await e.dataTransfer.files[0].arrayBuffer())
    }

    return (
        <div
        onDragOver={dragOver}
        onDrop={drop}
        >
        </div>
    )
}

const pickFile = () => {
    const filePicker = async (e) => {
        const pickerOpts = {
            types: [
                {
                    description: 'Images',
                    accept: {
                        'image/jpeg': ['.jpg', '.jpeg', '.png'],
                    }
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false
        };

        const [fileHandle] = await (window.showOpenFilePicker(pickerOpts));
        console.log(fileHandle);
        const f = await fileHandle.getFile();
        console.log(f);
        console.log(await f.arrayBuffer());
    }
    return (
        <button onClick={filePicker}>File Picker</button>
    )
}

const fetchFile = () =>{
    fetch('./filePath.extension')
    .then(response => response.blob())
    .then( async (result) => {
        console.log(result);
        // console.log(await result.text());
        console.log(await result.arrayBuffer());
    })
    .cache((error) => {
        console.error(error);
    })
}
```

## 文件操作

```jsx
const fileOperation = () => {
    const [flieHandle, setFileHandle] = useState();

    const save = async (handle) => {
        if(!handle) return;
        const stream = await handle.createWritable();
        await stream.write(ref.current.value);
        await stream.close();
    }

    const onCreate = async () => {
        const createFile = await window.showSaveFilePicker();
        setFileHandle(createFile);
        return createFile
    }
    const onOpen = async () => {
        const [openFile] = await window.showOpenFilePicker();
        setFileHandle(openFile);
        const f = await openFile.getFile();
        ref.current.value = await f.text();
    }
    const onSave = async (e) => {
        e.preventDefault();
        if(!fileHandle){
            await onCreate();
        }
        save(flieHandle);
    }
    const onSaveAs = async (e) => {
        e.preventDefault();
        const createFile = await onCreate();
        save(createFile);
    }

    return (
        <>
            <textarea ref={ref}></textarea>
            <div>
                <button onClick={onCreate}>create</button>
                <button onClick={onOpen}>open</button>
                <button onClick={onSave}>save</button>
                <button onClick={onSaveAs}>save as</button>
            </div>
        </>
    )
}
```

## image&canvas

```jsx
const imageCanvas = () => {
    const refCanvas = useRef();
    const [objUrl, setObjUrl] = useState();
    const [context, setContext] = useState();

    useEffect(()=>{
        const ctx = refCanvas.current.getContext('2d');
        if(!ctx) setContext(ctx)
    })

    const color2Gray = (imgData) => {
        for (let index = 0; i = 0; i < imgData.data.width; i++) {
            for (let j = 0; j < imgData.data.height; j++; index+=4) {
                const red = imgData.data[index];
                const green = imgData.data[index + 1];
                const blue = imgData.data[index + 2];

                const ave = (red + green + blue) / 3;

                imgData.data[index] = ave;
                imgData.data[index + 1] = ave;
                imgData.data[index + 2] = ave;
            }
        }
    }

    const onOpen = async () => {
        const [fileHandle] = await window.showOpenFilePicker();
        const f = await fileHandle.getFile();
        const url = URL.createObjectURL(f);
        setObjUrl(url);

        const image = new Image();
        image.width = 100;
        image.onload = () => {
            context.drawImage(image, 0, 0, 100, 100);
            const data = context.getImageData(0, 0, 100, 100);
            color2Gray(data);
            context.putImageData(data, 0, 0, 0, 0, data.width, data.height);
        }
        image.src = url;
    }
    const onSave = async (handle) => {
        if(!handle) return;
        const stream = await handle.createWritable();
        refCanvas.current.toBlob(async (b) => {
            if(!b) return;
            await stream.write(b);
            await stream.close();
        })

    }

    return (
        <>
            <img src={objUrl} width={300} alt='img' />

            <canvas ref={refCanvas} width={100} height={100}>
                This browser does not support canvas
            </canvas>

            <div>
                <button onClick={onOpen}>open</button>
                <button onClick={onSave}>save</button>
            </div>
        </>
    )
}
```

## BlobURL&DataURL

* `URL.createObjectURL(blob)` : blob url , 可以在新标签页中打开
* `FileReader.readAsDataURL(file)` : data url , 程序用不允许在新标签页中打开 , 但是可以通过手动复制的方式打开
* `<a>` : 可以设置属性 `download` 来下载内容

```jsx
const URL = () => {
    type TYPE = 'text' | 'image' | '';
    const [type, setType] = useState<TYPE>();
    const [objUrl, setObjUrl] = useState();

    const onFetch = (type: TYPE, filepath: string) => {
        fetch(filepath)
        .then(response => response.blob())
        .then( async (result: Blob) => {
            setObjUrl(URL.createObjectURL(result));
            setType(type);

            // const reader = new FileReader();
            // reader.onload = (e) => {
            //     setObjUrl(e.target.result);
            //     setType(type);
            // }
            // reader.readAsDataURL(result);
        })
        .cache(error => {
            console.error(error);
        })
    }

    return (
        <>
            <button onClick={onFetch('text', './filepath.text')}>text</button>
            <button onClick={onFetch('image', './filepath.image')}>image</button>
            {
                type === 'text'
                ? <iframe src={objUrl} width={300}></iframe>
                : <img src={objUrl} width={300} alt='img' />
            }
        </>
    )
}
```

## 访问文件夹

* `window.showDirectoryPicker`
* `dirHandle.values`
* `dirHandle.getFileHandle`

```jsx
const folder = () =>{
    const ref = useRef();
    const [list, setList] = useState([]);
    const [dirHandle, setDirHandle] = useState();

    const onOpenDir = async () => {
        const fsfHandle = await window.showDirectoryPicker();
        if(!fsfHandle) return;
        console.log(fsfHandle);
        const entries = await fsfHandle.values();
        console.log(entries);
        const items = []
        for await ( const entry of entries) {
            console.log(entry, entry.name);
            if(entry.isFile){
                items.push(`${entry.name}${entry.kind === 'file' ? '' : `${entry.kind}`}`);
            }
        }
        if(items.length) {
            setDirHandle(fsfHandle);
            setList(items);
        }
    }
    const onClickFileName = async (filename) => {
        const fHandle = await dirHandle.getFileHandle(filename);
        console.log(fHandle);
        if(fHandle.kind === 'file'){
            const f = await fHandle.getFile();
            if(!f) return;
            console.log(f);
            const t = await f.text();
            ref.current.value = t;
        }
    }

    return (
        <>
            <button onClick={onOpenDir}>folder</button>
            <textarea ref={ref}></textarea>
        </>
    )
}
```

## 文件上传

`formData()` 格式
