function RectanglePillButton({label, icon, dark}) {
    return (
        <div className={`rounded-md font-medium flex flex-row cursor-pointer items-center gap-1 px-3 py-1
            ${dark ? 'bg-black text-white hover:bg-darkHoverColor text-sm'
                : 'bg-sidebar hover:bg-hoverColor text-sm' }`}>
            <div className="w-4 h-4">{icon}</div> 
            <div>{label}</div>
        </div>
    )
}

export default RectanglePillButton;