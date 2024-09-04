import React, { useEffect, useState , useMemo, useCallback} from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { AgGridReact } from 'ag-grid-react'; 
import { themeMaterial } from 'ag-grid-community';

import { ChevronUp, ChevronDown, Star, Folder, FileText, File } from 'lucide-react';

export default function DropboxTable({data, onRowSelected, onItemClick}) {
  const [sorting, setSorting] = React.useState([]);
  const columnHelper = createColumnHelper();

  const FileIcon = ({ type }) => {
    return type == "folder" ? <Folder className="text-blue-400" /> : <File className="text-black font-thin" />;
  };

  const fileViewTheme = themeMaterial.withParams({
    wrapperBorder: false,
    headerColumnBorder: false,
    fontSize: 16,
    headerFontSize: 19,
  })

  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow'
    }
  }, [])

  const tableCellClass = "flex items-center !border-0"

  const [colDefs, setColDefs] = useState([
      { field: "name",
        cellRenderer: props => {
            return  (
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {onItemClick(props.data)}}>
              <FileIcon type={props.data.type} />
              <span>{props.value}</span>
            </div>
          )
        },
        flex:2,
        cellClass: tableCellClass
      },
      {field: "access", headerName: "Who Can Access", 
        cellClass: tableCellClass},
      {field: "size", 
        cellClass: tableCellClass},
      {field: "modified", 
        cellClass: tableCellClass},
  ])

  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     sorting,
  //   },
  //   onSortingChange: setSorting,
  //   getSortedRowModel: getSortedRowModel(),
  //   getCoreRowModel: getCoreRowModel(),
  // });

  const getRowId = useCallback((props) =>  String(props.data.id), [])
  const selectionColumnDef = useMemo(() => {
      return {
        cellClass: tableCellClass
      }
  }, [])

  return (
    <div className='h-[50vh] w-full'>
    <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        onRowSelected={(e) => onRowSelected(e.data)}
        theme={fileViewTheme}
        getRowId={getRowId}
        rowHeight={70}
        selectionColumnDef={selectionColumnDef}
    />
</div>
  );
}

  // const columns = [
  //   columnHelper.accessor('name', {
  //     header: 'Name',
  //     cell: info => (
  //       <div className="flex items-center gap-2" onClick={() => {onItemClick(info.row.original)}}>
  //         <FileIcon type={info.row.original.type} />
  //         <span>{info.getValue()}</span>
  //       </div>
  //     ),
  //   }),
  //   columnHelper.accessor('access', {
  //     header: 'Who can access',
  //     cell: info => (
  //       <div className="flex items-center gap-2">
  //         <Star className="w-4 h-4 text-gray-300" />
  //         <span>{info.getValue()}</span>
  //       </div>
  //     ),
  //   }),
  //   columnHelper.accessor('size', {
  //     header: 'Size',
  //   }),
  //   columnHelper.accessor('modified', {
  //     header: 'Modified',
  //     cell: info => (
  //       <div className="text-sm text-gray-600">
  //         {info.getValue()}
  //         {info.row.original.modified !== '--' && <div className="text-xs">by you</div>}
  //       </div>
  //     ),
  //   }),
  // ];

    // <div className="w-full py-4 overflow-scroll h-[50vh]">
    //   <table className="min-w-full">
    //     <thead>
    //       {table.getHeaderGroups().map(headerGroup => (
    //         <tr key={headerGroup.id} className='align-middle'>
    //           <th className="w-8 px-2">
    //           <BigCheckbox size={18}/>
    //           </th>
    //           {headerGroup.headers.map(header => (
    //             <th
    //               key={header.id}
    //               className="px-4 py-2 text-left font-medium text-gray-700 cursor-pointer"
    //               onClick={header.column.getToggleSortingHandler()}
    //             >
    //               <div className="flex items-center gap-1">
    //                 {flexRender(header.column.columnDef.header, header.getContext())}
    //                 {header.column.getIsSorted() ? (
    //                   header.column.getIsSorted() === 'desc' ? (
    //                     <ChevronDown className="w-4 h-4" />
    //                   ) : (
    //                     <ChevronUp className="w-4 h-4" />
    //                   )
    //                 ) : null}
    //               </div>
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {table.getRowModel().rows.map(row => (
    //         <tr
    //           key={row.id}
    //           className="group hover:bg-hoverColor1 hover:cursor-pointer border-b border-gray-100 align-middle py-3"
    //         >
    //           <td className="w-8 px-2">
    //             <BigCheckbox onToggle={(checked) => {onCheckboxToggle ? onCheckboxToggle(row.original, checked):"";}} size={18}/>
    //           </td>
    //           {row.getVisibleCells().map(cell => (
    //             <td key={cell.id} className="px-4 py-2">
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>