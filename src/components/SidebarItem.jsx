function SidebarItem({label, icon}) {
    return (
        <a className="w-full pl-3 pr-3 py-1" href="#">
            <span className="flex items-center pl-3 py-3 text-stone-500 opacity-90 hover:bg-black hover:rounded-lg hover:text-white hover:opacity-100">
                <span className="">{icon}</span>
                <span className="mx-3 font-light">{label}</span>
            </span>
        </a>

    )
}

export default SidebarItem;

