function SidebarItem({ label, icon: Icon, isActive=false, onClick }) {

    return (
        <a 
            className={`w-full pl-1 pr-3 py-1 flex justify-start items-center group gap-2 cursor-pointer transition ${isActive ? 'text-blue-700' : ''}`} 
            href="#"
            onClick={onClick}
        >
            <div className={`h-1/2 w-1 rounded-lg transition ${isActive ? 'bg-[#0F5EA3] group-hover:bg-[#0F5EA3]' : 'group-hover:bg-[#C7C7C7]'}`}></div>
            <span className={`w-full flex items-center pl-3 py-2 text-textColor opacity-90 hover:rounded-lg hover:opacity-100 hover:bg-[#EBEBEB]`}>
                <span> {<Icon isActive={isActive} height={20} width={20} className={`${isActive ? 'fill-[#0F5EA3]': ''}`}/>}</span>
                <span className={`mx-2 font-normal ${isActive ? 'text-[#0F5EA3] !font-medium group-hover:text-black': ''}`}>{label}</span>
            </span>
        </a>
    );
}

export default SidebarItem;