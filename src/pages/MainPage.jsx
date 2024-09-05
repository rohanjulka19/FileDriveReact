import React, { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from 'uuid';
import JSZip from "jszip"
import { saveAs } from 'file-saver';

import SearchBar from "../components/SearchBar"
import { Star, ArrowDownToLine, Clock4, Trash} from 'lucide-react';
import MainButton from "../components/MainButton";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import PillButton from "../components/PillButton";
import Sidebar from "../components/sidebar";
import DropboxTable from "../components/FileView";
import CreateFolderDialog from "../components/CreateFolderDialog";
import RectanglePillButton from "../components/RectanglePillButton";
import UploadPanel from "../components/UploadPanel"
import FileAPI from "../api/FileAPI";
import CreateFolderIcon from "../components/icons/CreateFolderIcon";
import UploadIcon from "../components/icons/UploadIcon";

export default function Main() {
    let [isFileDialogOpened, setIsFileDialogOpened] = React.useState(false)
    ModuleRegistry.registerModules([AllCommunityModule]);
    const [data, setData] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const fileInputRef = useRef(null)
    const [fileUploadQueue, setFileUploadQueue] = useState([])
    const fileUploadQueueRef = useRef([])
    const parentIdRef = useRef()
    const [showPanel, setShowPanel] = useState(false)
    const [openPanel, setOpenPanel] = useState(false)

    const formatSize = (size) => {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
        let unitType = 0
        while (size > 1000) {
            size = size / 1024
            unitType += 1
        }
        return `${size ? size.toFixed(2): 0} ${units[unitType]}`
    }

    const formatDate = (date) => {
        const parsedDate = new Date(date)
        const elapsedTime = new Date(Date.now()) - parsedDate
        
        const elapsedTimeInSec = elapsedTime / 1000
        if (elapsedTimeInSec < 60) {
            return `${Math.floor(elapsedTimeInSec)} seconds ago`
        }

        const elapsedTimeInMins = elapsedTimeInSec / 60
        if (elapsedTimeInMins < 60) {
            return `${Math.floor(elapsedTimeInMins)} minutes ago`
        }

        const elapsedTimeInHours = elapsedTimeInMins / 60
        if (elapsedTimeInHours < 24) {
            return `${Math.floor(elapsedTimeInHours)} hours ago`
        }

        return parsedDate.toLocaleDateString()
    }

    const transformDoc = (doc) => {
        console.log(doc.name)
        return {
            id:doc.id,
            name: doc.name,
            access: 'Private',
            size: formatSize(doc.size),
            modified: formatDate(doc.updated_at),
            type: doc.is_dir ? "folder": doc.name.split(".").pop()  
        }
    }

    const handleItemClick = async (item) => {
        if (item.type == "folder") {
            const items = await FileAPI.getItems(item.id)
            const transformedItems = items.map(transformDoc)
            setData(transformedItems)
            parentIdRef.current = item.id
        } else {
            console.log("file item clicked")
        }
    }

    const createFolder = (folderName) => {
        FileAPI.createItem(folderName, true, null, parentIdRef.current, 0)
        .then((doc) => {
            const updatedData = [...data, transformDoc(doc)]
            setData(updatedData)
        })
    }

    const createZipFileForItems = async (parentName, items, zip) => {
        for (let item of items) {
            if (item.type === "folder" || item.is_dir) {
                console.log(parentName)
                zip.folder(`${parentName}/${item.name}`)
                const folderItems = await FileAPI.getItems(item.id)
                await createZipFileForItems(`${parentName}/${item.name}`, folderItems, zip)
            } else {
                const fileData = await downloadSingleFile(item)
                zip.file(`${parentName}/${item.name}`, fileData)
            }
        }
        return zip
    }

    const downloadSingleFile = async (file) => {
        const resp = await FileAPI.getDownloadUrl(file.id)
        let fileData =   await fetch(resp.download_url)
        fileData = await fileData.blob()
        return fileData 
    }

    const downloadSelectedItems = () => {
        const ROOT_FOLDER_NAME = "filedrive-data"
        if (selectedItems.length > 1 || selectedItems[0].type == "folder") {
            let zipFile = JSZip()
            createZipFileForItems(ROOT_FOLDER_NAME, selectedItems, zipFile)
            .then((zip) => {
                zip.generateAsync({ type:"blob" })
                .then(function (content) {
                    saveAs(content, `${ROOT_FOLDER_NAME}.zip`);
                });
            })
        } else {
            downloadSingleFile(selectedItems[0])
            .then((content) => {
                saveAs(content, selectedItems[0].name)
            })
        } 
    }

    const unselectAllItems = () => {
        setSelectedItems([])
    }

    const deleteSelectedItems = async () => {
        let resp = await FileAPI.deleteItems(selectedItems.map(item => item.id))
        let selectedItemsSet = new Set()
        for (let item of selectedItems) {
            selectedItemsSet.add(item.id)
        }
        if (resp.status == 200) {
            setData((oldData) => {
                return oldData.filter((item) => !selectedItemsSet.has(item.id))
            })
            unselectAllItems()
        }
    }

    const updateFileRequestStatus = (uploadId, status) => {
        const newFileUploadQueue = fileUploadQueueRef.current.map((fileUploadRequest) => {
            if (fileUploadRequest.uploadId === uploadId) {
                fileUploadRequest.status = status
            }
            return fileUploadRequest
        })
        setFileUploadQueue(newFileUploadQueue)
        fileUploadQueueRef.current = newFileUploadQueue
    }
 
    const handleItemUpload = (e) => {
        const files = e.target.files
        const curParentId = parentIdRef.current
        setOpenPanel(true)
        setShowPanel(true)
        for (let file of files) {
           uploadFile(file, curParentId).then((fileUploadRequest) => {
                console.log(fileUploadRequest)
                FileAPI.createItem(fileUploadRequest.file.name, 
                    false,
                    fileUploadRequest.objectKey,
                    fileUploadRequest.parent,
                    fileUploadRequest.file.size
                ).then((doc) => {
                    const updatedData = [...data, transformDoc(doc)]
                    setData(updatedData)
                    updateFileRequestStatus(fileUploadRequest.uploadId, "Completed")
                })
           })
        }
        fileInputRef.current.value = ""
    }

    const uploadFile = async (file, parentId) => {
        const uploadId = uuidv4();
        let fileUploadRequest = {
            uploadId: uploadId,
            file: file,
            status: "Initiating",
            parent: parentId
        }
        
        let newFileUploadQueue = [...fileUploadQueueRef.current, fileUploadRequest]
        setFileUploadQueue(newFileUploadQueue)
        fileUploadQueueRef.current = newFileUploadQueue

        updateFileRequestStatus(fileUploadRequest.uploadId, "In Progress")

        const uploadMetadata = await FileAPI.getUploadMetadata()
        fileUploadRequest.objectKey = uploadMetadata.object_key

        const resp = await fetch(uploadMetadata.upload_url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": "application/octet-stream",
            },
        });
        if (resp.status == 200) {
            fileUploadRequest.fileId = resp.id
            return fileUploadRequest
        }
    }

    useEffect(() => {
        FileAPI.getItems().then((docs) => {
          const transformedItems = docs.map(transformDoc)
          setData(transformedItems)
        })
      }, [])
  
    const handleRowSelected = (row) => {
        if (selectedItems.find((item) => item.id === row.id)) {
            setSelectedItems(selectedItems.filter((cur) => cur.id !== row.id))
        }  else {
            setSelectedItems([...selectedItems, row])
        }
    };
      
    return (
<div className="flex h-screen bg-[#F5F5F5]">
    <div className="w-2/12">
        <Sidebar> </Sidebar>
    </div>
    <div className="w-10/12 flex flex-col justify-start bg-[#F5F5F5] gap-y-4">
        <div className="bg-[#F5F5F5]">
            <div className="flex flex-row justify-between pt-4 text-sm">
                <SearchBar></SearchBar>
                <button className="w-8 h-8 rounded-full text-center bg-yellow-500">RJ</button>
            </div>
            <div className="flex flex-wrap gap-4 py-4">
                <MainButton 
                    icon={UploadIcon} 
                    text="Upload or drop" 
                    onClick={() => fileInputRef.current.click()}
                    selected
                />
                <MainButton 
                    icon={CreateFolderIcon} 
                    text="Create folder" 
                    onClick={() => { setIsFileDialogOpened(true)}}
                />
                <input ref={fileInputRef} onChange={handleItemUpload} type="file" hidden></input>
            </div>
            <div className="flex flex-col gap-y-4 h-full">
                <div className="flex flex-row justify-between items-end ">
                        <span className="text-2xl font-medium">All files</span>
                        <button className=" p-2 rounded-xl bg-red-600"> RJ </button>
                </div>
                <div className="flex flex-row gap-2">
                    {selectedItems.length > 0 ? (
                        <>
                            <RectanglePillButton label="Download" dark={true} onClick={downloadSelectedItems} icon={<ArrowDownToLine width={15} height={15}/>}/>
                            <RectanglePillButton label="Delete" onClick={deleteSelectedItems} icon={<Trash width={15} height={15}/>}/>
                            
                        </>
                        ): (
                        <>
                            <PillButton label="Recents" icon={<Clock4 width={15} height={15} />}/>
                            <PillButton label="Starred" icon={<Star width={15} height={15} />}/>
                        </>
                    )}

                </div>
            </div>
        </div>
        <div className="border border-solid border-white rounded-xl w-full h-full overflow-hidden bg-white">
            <DropboxTable data={data} onRowSelected={handleRowSelected} onItemClick={handleItemClick}/>
            <UploadPanel show={showPanel} 
            setShowPanel={setShowPanel} 
            setOpenPanel={setOpenPanel} 
            openPanel={openPanel} 
            fileUploadRequests={fileUploadQueue} />
        </div>
    </div>
    <CreateFolderDialog isOpen={isFileDialogOpened} setIsOpen={setIsFileDialogOpened} onClick={createFolder}/>
</div>
    )
}
