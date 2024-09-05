function RectanglePillButton({label, icon, dark, onClick}) {
    return (
        <div className={`rounded-md font-medium flex flex-row cursor-pointer items-center gap-1 px-3 py-1 text-sm border
            ${dark ? 'bg-black text-white hover:bg-darkHoverColor'
                : 'bg-[#F5F5F5] border-[#C7C7C7] bg-sidebar hover:bg-[#EBEBEB]' }`}
            
            onClick={onClick}>
            <div className="w-4 h-4">{icon}</div> 
            <div>{label}</div>
        </div>
    )
}

export default RectanglePillButton;