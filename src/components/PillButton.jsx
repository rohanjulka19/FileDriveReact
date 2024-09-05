function PillButton({label, icon, dark}) {
    return (
        <div className={`border border-[#C7C7C7] bg-[#F5F5F5] rounded-full flex flex-row cursor-pointer items-center gap-1 px-3 py-1 text-sm
            ${dark ? 
                'bg-darkPillBtnBg hover:bg-[darkPillBtnHover] text-white'
                :'hover:bg-[#EBEBEB]'} `}>
            {icon ? <div className="w-4 h-4">{icon}</div>: "" }
            <div>{label}</div>
        </div>
    )
}

export default PillButton;