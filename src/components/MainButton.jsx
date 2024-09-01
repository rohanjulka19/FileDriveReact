import React from 'react';
import { Upload, Plus, FolderPlus, Download, GitBranch, Share2 } from 'lucide-react';

const MainButton = ({ icon: Icon, text, selected = false, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center gap-2 px-4 py-3 rounded-lg
      transition-all duration-200 min-w-[140px]
      ${selected 
        ? 'bg-black text-white hover:bg-hoverColor' 
        : 'bg-white hover:bg-gray-50 border border-gray-200'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{text}</span>
  </button>
);

export default MainButton;
