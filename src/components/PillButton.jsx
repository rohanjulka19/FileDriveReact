function PillButton({label, icon}) {
    return (
        <div className="rounded-full flex flex-row cursor-pointer items-center gap-1 bg-sidebar hover:bg-hoverColor px-3 py-1 text-sm">
            <div className="w-4 h-4">{icon}</div> 
            <div>{label}</div>
        </div>
    )
}

export default PillButton;