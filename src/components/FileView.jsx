import React, { useState , useMemo, useCallback} from 'react';

import { AgGridReact } from 'ag-grid-react'; 
import { themeMaterial } from 'ag-grid-community';

import { Folder, File } from 'lucide-react';
import { FileIcon, defaultStyles } from "react-file-icon"

export default function DropboxTable({data, onRowSelected, onItemClick}) {

  const getFileIconColor = (type) => {
      switch (type) {
        case "png" || "jpg" || "jpeg" || "webp" || "svg" : return "lavender"
        case "mp3" || "m4a" || "mid" || "m4v" || "mkv" || "mpg" || "mpeg" || 
        "mov" || "flc" || "flac" || "ogg" || "ogv" || "swf" || 
        "wav" || "webm" || "wmv" || "aac" || "3g2" || "3gp" || "avi" : return "aliceblue"
        default: return "#F7F5F1"
      }
  }

  const ItemIcon = ({ type }) => {
    return type == "folder" ? <Folder className="text-[#FFD867] fill-[#FFD867]" /> : <FileIcon  extension={type} {...defaultStyles[type]} color={getFileIconColor(type)}/>;
  };

  const fileViewTheme = themeMaterial.withParams({
    wrapperBorder: false,
    headerColumnBorder: false,
    fontSize: 16,
    headerFontSize: 16,
    borderColor: "#F0F0F0",
    checkboxCheckedBackgroundColor: '#0078D3',
  })

  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow'
    }
  }, [])

  const tableCellClass = "flex truncate items-center !border-0 font-light text-[#616161] group-hover:text-black group-aria-selected:text-black"
  const tableHeaderClass = "text-black"

  const [colDefs, setColDefs] = useState([
      { field: "name",
        cellRenderer: props => {
            return  (
            <div className="flex items-center gap-4 cursor-pointer overflow-hidden truncate" onClick={() => {onItemClick(props.data)}}>
              <div className='w-6 h-6 flex-shrink-0'><ItemIcon type={props.data.type} /></div>
              <span className="truncate">{props.value}</span>
            </div>
          )
        },
        flex:2,
        cellClass: `!text-black group-aria-selected:font-medium ${tableCellClass}`,
        headerClass: tableHeaderClass,
        resizable: false,
        suppressSizeToFit: true
      },
      {field: "modified", 
        cellClass: tableCellClass,
        headerClass: tableHeaderClass
      },      
      {field: "size", 
        cellClass: tableCellClass,
        headerClass: tableHeaderClass
      },
      {field: "access", headerName: "Sharing", 
        cellClass: tableCellClass,
        headerClass: tableHeaderClass
      }
  ])

  const getRowId = useCallback((props) =>  String(props.data.id), [])
  const selectionColumnDef = useMemo(() => {
      return {
        cellClass: `${tableCellClass} hidden group-hover:inline group-aria-selected:inline`
      }
  }, [])

  const tableRowClass = "!hover:bg-[#F5F5F5] group"
  return (
    <div className='h-full w-full'>
    <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        onRowSelected={(e) => onRowSelected(e.data)}
        theme={fileViewTheme}
        getRowId={getRowId}
        rowHeight={50}
        selectionColumnDef={selectionColumnDef}
        rowClass={tableRowClass}
    />
</div>
  );
}