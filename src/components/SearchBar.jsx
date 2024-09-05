import React, { useState } from "react";
import { X, Search } from "lucide-react";


function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div
      className={`flex font-light items-center gap-2 bg-white hover:cursor-text shadow-sm hover:shadow-md group hover:text-white rounded-lg px-4 py-3 w-6/12 ${
        isFocused
          ? "!shadow-lg border-transparent"
          : "border-gray-300" 
      }`}
    >
      <Search width={17} height={17} className="group-hover:text-black"/>
      <input
        className={`w-full bg-transparent outline-none text-gray-600 group-hover:cursor-text placeholder-gray-500`}
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
