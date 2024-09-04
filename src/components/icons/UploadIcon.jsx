import React, { forwardRef } from "react"

const UploadIcon = forwardRef(({hover, ...props}, ref) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-upload arrow-svg"
    data-hover={hover}
    >
  <style>
    {`@keyframes pulse {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  30% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0;
    transform: translateY(-20px);
  }
  51% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.arrow-svg[data-hover="true"] .arrow {
  animation: pulse 0.5s;
}`}
  </style>

  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <g className="arrow">
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" x2="12" y1="3" y2="15"/>
  </g>
</svg>)
})

export default UploadIcon;