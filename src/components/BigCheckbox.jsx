import React, { useState } from "react";
import { Check } from "lucide-react";

const BigCheckbox = ({ size = 10, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onToggle) onToggle(newState);
  };


  return (
    <label
      onClick={handleToggle}
      className={`inline-flex items-center justify-center cursor-pointer rounded border-2 border-gray-300 
      ${isChecked ? "!bg-blue-500 !border-blue-500 !ring-blue-500" : "bg-white"} 
      focus:outline-none focus:ring-2 focus:ring-blue-500`}
      style={{
        width: size,
        height: size,
      }}
    >
      {isChecked && <Check className="text-white" size={size} strokeWidth={4} />}
    </label>
  );
};

export default BigCheckbox;
