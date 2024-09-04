import React, { forwardRef } from "react"

const CreateFolderIcon = forwardRef(({hover, ...props}, ref) => {
    return (
    <svg  xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-folder-plus folder-svg"
    data-hover={hover}>
    <style>
        {
            `.folder-svg {
                stroke-dasharray: 100;
                }
        
                .folder-svg[data-hover="true"] .border {
                animation: drawOutline 1.3s, rotateAndScale 0.5s;  
        
                }
        
                .folder-svg[data-hover="true"] .plus {
                animation: rotateAndScale 0.5s;
                }
        
                .border {
                transform-origin:center;
                }
        
                .plus {
                transform-origin: center;
                
                }
        
                @keyframes drawOutline {
                0% {
                    stroke-dashoffset: 100;
                }
                100% {
                    stroke-dashoffset: 0;
                }
                }
        
                @keyframes rotateAndScale {
                0% {
                    transform: rotate(40deg) scale(0.1);
                }
                100% {
                    transform: rotate(0deg) scale(1);
                }
            }
            `
        }
    </style>
    <g className="plus">
        
    <path className="plus" d="M12 10v6"/>
    <path d="M9 13h6"/>
    </g>
    <path className="border" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
    </svg>
    )
})


export default CreateFolderIcon;