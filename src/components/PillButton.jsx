function PillButton({label, icon, dark}) {
    return (
        <div className={`rounded-full flex flex-row cursor-pointer items-center gap-1 px-3 py-1 text-sm
            ${dark ? 
                'bg-darkPillBtnBg hover:bg-darkPillBtnHover text-white'
                :'bg-sidebar hover:bg-hoverColor'} `}>
            {icon ? <div className="w-4 h-4">{icon}</div>: "" }
            <div>{label}</div>
        </div>
    )
}

export default PillButton;