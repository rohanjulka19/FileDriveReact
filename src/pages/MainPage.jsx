import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../components/SearchBar"
import { Upload, ArrowDownToLine, FolderPlus, Trash} from 'lucide-react';
import MainButton from "../components/MainButton";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import TimeIcon from "../components/icons/TimeIcon";
import StarIcon from "../components/icons/StarIcon";
import PillButton from "../components/PillButton";
import Sidebar from "../components/sidebar";
import DropboxTable from "../components/FileView";
import CreateFolderDialog from "../components/CreateFolderDialog";
import RectanglePillButton from "../components/RectanglePillButton";
import UploadPanel from "../components/UploadPanel"
import FileAPI from "../api/FileAPI";
import { v4 as uuidv4 } from 'uuid';

export default function Main() {
    let [isFileDialogOpened, setIsFileDialogOpened] = React.useState(false)
    ModuleRegistry.registerModules([AllCommunityModule]);
    const [data, setData] = useState([])
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isChecked, setIsChecked] = useState(false)
    const [showFileBrowser, setShowFileBrowser] = useState(false)
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
                FileAPI.createItem(fileUploadRequest.file.name, 
                    false,
                    fileUploadRequest.objectKey,
                    fileUploadRequest.parent,
                    fileUploadRequest.file.size
                ).then((doc) => {
                    const updatedData = [...data, {
                        id: doc.id,
                        name: doc.name,
                        size: formatSize(doc.size),
                        type: "file",
                        access: 'Only you',
                        size: '71.48 KB',
                        modified: '27/3/2016 9:36 am',
                    }]
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
          const transformedData = docs.map((doc) => {
              return {
                id:doc.id,
                name: doc.name,
                access: 'Only you',
                size: formatSize(doc.size),
                modified: '27/3/2016 9:36 am',
                type: doc.is_dir ? "folder": "file"
              }
          })
          setData(transformedData)
        })
      }, [])
  
    const handleCheckboxToggle = (id, checked) => {
        setSelectedItems((prevSelected) => {
          const newSelected = new Set(prevSelected);
          if (checked) {
            newSelected.add(id);
          } else {
            newSelected.delete(id);
          }
          return newSelected;
        });
        console.log(selectedItems, selectedItems.size)
    };
      
    return (
<div className="flex h-screen">
    <div className="w-2/12">
        <Sidebar></Sidebar>
    </div>
    <div className="w-10/12 flex flex-col justify-start px-8 pt-4 gap-y-28">
        <div>
            <div className="flex flex-row justify-between">
                <SearchBar></SearchBar>
                <button className="w-8 h-8 rounded-full text-center bg-yellow-500">RJ</button>
            </div>
            <div className="flex flex-wrap gap-4 py-4">
                <MainButton 
                    icon={Upload} 
                    text="Upload or drop" 
                    onClick={() => fileInputRef.current.click()}
                />
                <MainButton 
                    icon={FolderPlus} 
                    text="Create folder" 
                    onClick={() => { setIsFileDialogOpened(true)}}
                />
                <input ref={fileInputRef} onChange={handleItemUpload} type="file" hidden></input>
            </div>
        </div>
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-row justify-between items-end ">
                    <span className="text-2xl">All Files</span>
                    <button className=" p-2 rounded-xl bg-red-600"> RJ </button>
            </div>
            <div className="flex flex-row gap-2">
                {selectedItems.size > 0 ? (
                    <>
                        <RectanglePillButton label="Download" dark={true} icon={<ArrowDownToLine width={15} height={15}/>}/>
                        <RectanglePillButton label="Delete" icon={<Trash width={15} height={15}/>}/>
                        
                    </>
                    ): (
                    <>
                        <PillButton label="Recents" icon={<TimeIcon width={15} height={15}/>}/>
                        <PillButton label="Starred" icon={<StarIcon width={15} height={15}/>}/>
                    </>
                )}

            </div>
            <DropboxTable data={data} onCheckboxToggle={handleCheckboxToggle}/>
            <UploadPanel show={showPanel} setShowPanel={setShowPanel} setOpenPanel={setOpenPanel} openPanel={openPanel} fileUploadRequests={fileUploadQueue} />
        </div>
    </div>
    <CreateFolderDialog isOpen={isFileDialogOpened} setIsOpen={setIsFileDialogOpened}/>
</div>
    )
}