import React, { useState } from "react";
import { X } from "lucide-react";


function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div
      className={`flex items-center border rounded-lg px-4 py-3 w-8/12 ${
        isFocused
          ? "shadow-md border-transparent"
          : "border-gray-300" // Gray border when not focused
      }`} // Black border on hover
    >
      <svg
        className="w-5 h-5 text-gray-400 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        ></path>
      </svg>
      <input
        className={`w-full bg-transparent outline-none text-gray-600 placeholder-gray-400`}
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        onFocus={() => setIsFocused(true)} // Set focus when clicked
        onBlur={() => setIsFocused(false)} // Remove focus when unfocused
      />
      {searchText && !isFocused && (
        <X
          className="w-5 h-5 text-gray-400 cursor-pointer"
          onClick={handleClear}
        />
      )}
    </div>
  );
}

export default SearchBar;
