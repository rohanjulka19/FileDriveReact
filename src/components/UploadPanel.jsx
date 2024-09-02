import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { X, ChevronUp, CircleCheck } from 'lucide-react'
import React, {useRef} from 'react'
import PillButton from './PillButton'
import UploadPanelRow from './UploadPanelRow'


function UploadPanel({show, setShowPanel, openPanel, setOpenPanel, fileUploadRequests}) {
  const panelBtn = useRef()
  const panel = useRef()
  const hidePanel = (e) => {
      e.preventDefault()
      if (setShowPanel) {
        setShowPanel(false)
      }
  }

  if (openPanel && panelBtn.currentl) {
      panelBtn.current.setAttribute('data-open', true)
  }

  const handlePanel = () => {
      const isClosed = !panelBtn.current.getAttribute('data-open')
      if (isClosed) {
          setOpenPanel(true)
          panelBtn.current.setAttribute('data-open', true)
      } else {
        setOpenPanel(false)
        panelBtn.current.removeAttribute('data-open')
      }
  }

  return (<>
         {show && <div className="absolute rounded-lg right-0 bottom-0 mr-10 mb-2 w-1/2 max-w-md bg-black/5">
            <div as="div" className="p-4 bg-black rounded-xl" >
              <div ref={panelBtn} onClick={handlePanel} className="group flex w-full items-center justify-between">
                <span className="text-lg font-medium text-white">
                  Uploads
                </span>
                <div className='flex flex-row gap-2'>
                  <div><ChevronUp className="size-fit cursor-pointer text-white rounded-md p-1 hover:bg-uploadPanelBtnHover group-data-[open]:rotate-180" /></div>
                  <div onClick={hidePanel}><X className='text-white cursor-pointer size-fit rounded-md p-1 hover:bg-uploadPanelBtnHover'/></div>
                </div>
              </div>
              { openPanel && <div ref={panel} className="mt-2 text-sm/5 text-white/50 flex flex-col gap-4 h-[50vh]">
                <div className='flex flex-row gap-2 text-black text-xs' >
                  <PillButton label="All Uploads" />
                  <PillButton label="Completed" dark={true}/>
                  <PillButton label="Failed" dark={true}/>
                </div>
                <div className='flex flex-col gap-2'>
                  { fileUploadRequests.map((fileUploadRequest) => {
                      return <UploadPanelRow 
                      key={fileUploadRequest.uploadId}
                      fileUploadRequest={fileUploadRequest}/>
                  })}
                </div>
              </div>}
            </div>
          </div>}
          </>
      )
}

export default UploadPanel;