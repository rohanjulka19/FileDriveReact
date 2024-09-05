import { useState } from 'react'
import SidebarItem from './SidebarItem'
import BoxIcon from './icons/BoxIcon';
import PhotoIcon from './icons/PhotoIcon';
import SharedFilesIcon from './icons/SharedFilesIcon';
import FilesIcon from './icons/FilesIcon';
import TrashIcon from './icons/TrashIcon';

function Sidebar() {
    const sidebarItems = [
        { label: "All Files", icon: FilesIcon },
        { label: "Photos", icon: PhotoIcon },
        { label: "Shared", icon: SharedFilesIcon },
        { label: "Deleted Files", icon: TrashIcon}
    ]
    const [activeIndex, setActiveIndex] = useState(0);

    return (
<div className="flex flex-col items-baseline w-full h-screen  py-8 overflow-y-auto bg-[#F5F5F5] rtl:border-r-0">
    <div className="px-2 text-xl flex justify-start items-center w-full gap-2">
        <div className="w-10 h-10"><BoxIcon/></div>
        <div className="font-medium text-lg">FileDrive</div>
    </div>
    <div className="flex flex-col justify-start items-end flex-1 mt-12 w-full text-md">
    {sidebarItems.map((item, index) => (
                <SidebarItem 
                    key={index} 
                    label={item.label} 
                    icon={item.icon} 
                    isActive={activeIndex === index} 
                    onClick={() => setActiveIndex(index)}
                />
            ))}
    </div>
</div>
    )
}

export default Sidebar;
