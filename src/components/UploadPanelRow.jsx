import PillButton from "./PillButton";

export default function UploadPanelRow({icon, title, label}) {
    return (
            <div className="flex flex-row w-full gap-2">
                <div className="text-uploadPanelSecondary">
                    {icon}
                </div>
                <div className="text-white flex flex-col items-start gap-1">
                    <div className="text-md">
                    {title}
                    </div>

                    <div className="text-xs font-medium">
                        <PillButton label={label} dark={true}/>
                    </div>
                </div>
            </div>

    )
}