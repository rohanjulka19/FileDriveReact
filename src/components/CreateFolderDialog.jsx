import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Folder, X } from 'lucide-react';
import React, {useState, useEffect} from 'react';

const CreateFolderDialog = ({ isOpen, setIsOpen, onClose = () => {}, onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const validateFolderName = (name) => {
    setFolderName(name);
    setIsValid(name.trim() !== '');
  };

  function close() {
    onClose()
    setFolderName("")
    setIsOpen(false)
  }

  return (
  <Dialog open={isOpen} onClose={close} className="relative z-50 rounded-lg">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
    <DialogPanel className="max-w-xl bg-white w-full rounded-xl self-start">
    <DialogTitle>
      <div className='flex justify-between items-center'>
            <div className="flex items-center gap-2 p-4">
              <Folder className="w-8 h-8 text-blue-400" />
              <h2 className="text-base font-semibold">Create folder</h2>
            </div>
            <div className='self-start mt-3 mr-3 hover:cursor-pointer hover:bg-dialogButtonHoverColor p-1 rounded-md'
            onClick={close}>
              <X className='w-5 h-5 self-start' ></X>
            </div>
        </div> 
      <hr></hr>
    </DialogTitle>
    <div className="px-4 space-y-6 mt-5 mr-1.5">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label 
            htmlFor="folderName" 
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="folderName"
            type="text"
            value={folderName}
            onChange={(e) => {validateFolderName(e.target.value)}}
            placeholder="Folder name"
            className="w-full text-sm px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>
    <div className="flex justify-end gap-3 p-4 rounded-b-lg mt-10 mr-1.5">
          <button
            type="button"
            onClick={close}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-dialogButtonColor hover:bg-dialogButtonHoverColor rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg text-white ${
              isValid
                ? 'bg-black hover:bg-gray-800'
                : 'bg-dialogButtonDisabled'
            }`}
          >
            Create
          </button>
    </div>
    </DialogPanel>
    </div>
</Dialog>)

    
  };

  export default CreateFolderDialog;