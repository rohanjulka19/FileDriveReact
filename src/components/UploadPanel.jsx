import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { X, ChevronUp, CircleCheck } from 'lucide-react'
import React, {useState} from 'react'
import PillButton from './PillButton'
import UploadPanelRow from './UploadPanelRow'


function UploadPanel() {
  const [showPanel, setShowPanel] = useState(false)

  return (
          <div className="absolute rounded-lg right-0 bottom-0 mr-10 mb-2 w-1/2 max-w-md bg-black/5">
            <Disclosure as="div" className="p-5 bg-black rounded-lg" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-lg font-medium text-white">
                  Uploads
                </span>
                <div className='flex flex-row gap-2'>
                  <ChevronUp className="size-fit text-white group-data-[hover]:bg-uploadBtnHover group-data-[open]:rotate-180" />
                  <X className='text-white size-fit'/>
                </div>
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50 flex flex-col gap-4 h-[50vh]">
                <div className='flex flex-row gap-2 text-black text-xs' >
                  <PillButton label="All Uploads" />
                  <PillButton label="Completed" dark={true}/>
                  <PillButton label="Failed" dark={true}/>
                </div>
                <div className='flex flex-col gap-2'>
                  <UploadPanelRow title="leetcode-train" label="JSON" icon={<CircleCheck/>}/>
                  <UploadPanelRow title="leetcode-train" label="JSON" icon={<CircleCheck/>}/>
                  <UploadPanelRow title="leetcode-train" label="JSON" icon={<CircleCheck/>}/>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
      )
}

export default UploadPanel;