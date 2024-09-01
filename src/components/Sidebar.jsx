import SidebarItem from './SidebarItem'
import BoxIcon from './icons/BoxIcon';
import FilesIcon from './icons/FilesIcon';
import PhotoIcon from './icons/PhotoIcon';
import SharedFilesIcon from './icons/SharedFilesIcon';
import TrashIcon from './icons/TrashIcon';

function Sidebar() {
    return (
<div className="flex flex-col items-baseline w-full h-screen px-4 py-8 overflow-y-auto bg-sidebar border-r rtl:border-r-0 rtl:border-l">
    <div className="px-2 text-xl flex justify-start items-center w-full gap-2">
        <div className="w-10 h-10"><BoxIcon/></div>
        <div className="font-medium text-lg">FileDrive</div>
    </div>
    <div className="flex flex-col justify-start items-end flex-1 mt-4 w-full text-lg">
        <SidebarItem label="All Files" icon={<FilesIcon color="none"/>}></SidebarItem>
        <SidebarItem label="Photos" icon={<PhotoIcon width={2} height={2}/>}></SidebarItem>
        <SidebarItem label="Shared" icon={<SharedFilesIcon width={2} height={2}/>}></SidebarItem>
        <SidebarItem label="Deleted Files" icon={<TrashIcon width={2} height={2}/>}></SidebarItem>
    </div>
</div>
    )
}

export default Sidebar;