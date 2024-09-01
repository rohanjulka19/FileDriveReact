import React, { useRef, useEffect, useState } from 'react';
import { X, Folder } from 'lucide-react';

const Dialog = ({ 
  isOpen, 
  onClose = () => {}, 
  children, 
  title,
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = ''
}) => {
  const dialogRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    console.log("opening dialog", dialogRef.current)
    if (dialogRef.current) {
      // dialogRef.current.style.display = isOpen ? 'fixed' : 'none';
    }
  }, [isOpen]);

  // useEffect(() => {
  //   const handleEscape = (event) => {
  //     if (event.key === 'Escape' && closeOnOutsideClick) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener('keydown', handleEscape);
  //   }

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //   };
  // }, [isOpen, onClose, closeOnOutsideClick]);

  const handleOutsideClick = (event) => {
    if (closeOnOutsideClick && dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
      
    }
  };

  // if (!isOpen  || !isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}
      ref={dialogRef}
    >
      <div 
        className={`bg-white rounded-lg w-full max-w-lg shadow-xl ${className}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b">
            {title}
            {showCloseButton && (
              <button
                onClick={() => {onClose(); isOpen = false}}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Dialog
