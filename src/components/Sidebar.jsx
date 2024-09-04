import SidebarItem from './SidebarItem'
import BoxIcon from './icons/BoxIcon';
import FilesIcon from './icons/FilesIcon';
import PhotoIcon from './icons/PhotoIcon';
import SharedFilesIcon from './icons/SharedFilesIcon';
import TrashIcon from './icons/TrashIcon';
import { Files, Image, Share, Trash2 } from 'lucide-react';

function Sidebar() {
    return (
<div className="flex flex-col items-baseline w-full h-screen  py-8 overflow-y-auto bg-stone-50 border-r rtl:border-r-0 rtl:border-l">
    <div className="px-2 text-xl flex justify-start items-center w-full gap-2">
        <div className="w-10 h-10"><BoxIcon/></div>
        <div className="font-medium text-lg">FileDrive</div>
    </div>
    <div className='bg-gray-200 h-[1px] w-full mt-4'></div>
    <div className="flex flex-col justify-start items-end flex-1 mt-2 w-full text-md">
        <SidebarItem label="All Files" icon={<Files />}></SidebarItem>
        <SidebarItem label="Photos" icon={ <Image/> }></SidebarItem>
        <SidebarItem label="Shared" icon={<Share />}></SidebarItem>
        <SidebarItem label="Deleted Files" icon={<Trash2 />}></SidebarItem>
    </div>
</div>
    )
}

export default Sidebar;
