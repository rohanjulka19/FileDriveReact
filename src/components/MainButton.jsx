import React, { useState, useRef} from 'react';

const MainButton = ({ icon:Icon, text, selected = false, onClick }) => {
  const [onHover, setOnHover] = useState(false)
  const iconRef = useRef()

  return (
    <button
      id="btn-hello"
      onClick={onClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`
        flex items-center justify-center gap-2 px-3 py-2 rounded-lg
        transition-all duration-200 min-w-[140px]
        ${selected 
          ? 'bg-black text-white hover:bg-stone-700' 
          : 'bg-white hover:bg-stone-100 border border-gray-200'
        }
      `}
    >

      <Icon ref={iconRef} hover={onHover} className="w-5 h-5" />
      <span className="text-sm font-medium">{text}</span>
    </button>
  )
}

export default MainButton;
