import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    PaginationState
  } from '@tanstack/react-table';
  import { GetAllUsers } from "./users";
import { PlaceholderUserI } from '../schema/placeholderType';
import { useState } from 'react';
  
  const columnHelper = createColumnHelper<PlaceholderUserI>();
  const columns = [ 
          columnHelper.accessor('name', {
              header: "Name"
          }),
          columnHelper.accessor('email', {
              header: "Email "
          }), 
          columnHelper.accessor("username", {
              header: "Username"
          }),
          columnHelper.accessor("website", {
            header: "Website"
          }),
          columnHelper.accessor("company.catchPhrase", {
            header: "Company Slogan"
          }),
          
      ]
  
  export function UserTable(){
const [pagination, setPagination] = useState<PaginationState>({
pageIndex: 0, pageSize: 5
})

      const {data}  = GetAllUsers();
    //   console.log("DATA", data)
  
      const table = useReactTable({
          data: data || [], 
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          onPaginationChange: setPagination,
          state: {
            pagination
          }
      })
  
      return (
          <div className="w-full p-2 overflow-x-auto">
              <table className='w-full overflow-x-auto divide-y divide-gray-200'>
                  <thead className='bg-gray-300'>
                      {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                  <th key={header.id} className='py-6 text-left p-2'>
                                      {header.isPlaceholder ? null : (
                                          flexRender(header.column.columnDef.header, header.getContext())
                                      )}
                                  </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody>
                      {table.getRowModel().rows.map(row => (
                          <tr key={row.id}>
                              {row.getVisibleCells().map(cell => (
                                  <td key={cell.id} className='p-2 border border-gray-200'>  {/* Added key here */}
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                              ))}
                          </tr>
                      ))}
                  </tbody>
              </table>
              <div className="flex items-center justify-between mt-4">
      <div className="flex space-x-2">
        <button
          className={` ${table.getCanPreviousPage() ? "cursor-pointer" : " cursor-not-allowed"} px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-600 hover:text-white`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className={` ${table.getCanNextPage() ? "cursor-pointer" : "cursor-not-allowed"} px-3 py-1 border rounded disabled:opacity-50 cursor-pointer hover:bg-gray-600 hover:text-white`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
      
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </strong>
      </span>
      
      <select
        className="p-1 border rounded"
        value={pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[2, 5, 10, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
          </div>
      )
  }