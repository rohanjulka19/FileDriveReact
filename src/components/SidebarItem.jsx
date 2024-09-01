function SidebarItem({label, icon}) {
    return (
        <a className="flex items-center w-full pl-8 py-4 text-gray-700 rounded-md hover:bg-hoverColor hover:rounded-xl" href="#">
            <span className="w-5 h-5">{icon}</span>
            <span className="mx-4 font-medium">{label}</span>
        </a>
    )
}

export default SidebarItem;