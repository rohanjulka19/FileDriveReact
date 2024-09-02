import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Star, Folder, FileText, File } from 'lucide-react';
import BigCheckbox from './BigCheckbox';

export default function DropboxTable({data, onCheckboxToggle, onItemClick}) {
  const [sorting, setSorting] = React.useState([]);
  const columnHelper = createColumnHelper();

  const FileIcon = ({ type }) => {
    return type == "folder" ? <Folder className="text-blue-400" /> : <File className="text-gray-400" />;
  };

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <div className="flex items-center gap-2" onClick={() => {onItemClick(info.row.original)}}>
          <FileIcon type={info.row.original.type} />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('access', {
      header: 'Who can access',
      cell: info => (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-gray-300" />
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('size', {
      header: 'Size',
    }),
    columnHelper.accessor('modified', {
      header: 'Modified',
      cell: info => (
        <div className="text-sm text-gray-600">
          {info.getValue()}
          {info.row.original.modified !== '--' && <div className="text-xs">by you</div>}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full py-4 overflow-scroll h-[50vh]">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='align-middle'>
              <th className="w-8 px-2">
              <BigCheckbox size={18}/>
              </th>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="group hover:bg-hoverColor1 hover:cursor-pointer border-b border-gray-100 align-middle py-3"
            >
              <td className="w-8 px-2">
                <BigCheckbox onToggle={(checked) => {onCheckboxToggle ? onCheckboxToggle(row.original, checked):"";}} size={18}/>
              </td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}