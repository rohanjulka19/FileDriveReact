import PillButton from "./PillButton";
import { CircleCheck, CircleDotDashed, CircleFadingArrowUp } from 'lucide-react'

export default function UploadPanelRow({fileUploadRequest}) {
    return (
            <div className="flex flex-row w-full gap-2">
                <div className="text-uploadPanelSecondary">
                {fileUploadRequest.status === "Initiating" ? <CircleDotDashed/>: 
                fileUploadRequest.status === "In Progress" ? <CircleFadingArrowUp/>: <CircleCheck/>}
                </div>
                <div className="text-white flex flex-col items-start gap-1">
                    <div className="text-md">
                    {fileUploadRequest.file.name}
                    </div>

                    <div className="text-xs font-medium flex flex-row items-center gap-2 justify-start">
                        <PillButton label="JSON" dark={true}/>
                        <div className="text-secondary text-[0.7rem]"> {fileUploadRequest.status} </div>
                    </div>
                </div>
            </div>

    )
}