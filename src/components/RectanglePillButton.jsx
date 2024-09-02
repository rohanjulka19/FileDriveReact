function RectanglePillButton({label, icon, dark}) {
    return (
        <div className={`rounded-md font-medium flex flex-row cursor-pointer items-center gap-1 px-3 py-1 text-sm
            ${dark ? 'bg-black text-white hover:bg-darkHoverColor'
                : 'bg-sidebar hover:bg-hoverColor' }`}>
            <div className="w-4 h-4">{icon}</div> 
            <div>{label}</div>
        </div>
    )
}

export default RectanglePillButton;