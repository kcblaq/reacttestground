import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { PostI } from "../schema/postSchema";
import { GetAllPost } from "./postsComponent";

const columnsHelper = createColumnHelper<PostI>();

const columns = [
    columnsHelper.accessor("id", {
        header: "ID",
        
    }),
    columnsHelper.accessor("title", {
        header: "Title",
        cell: info => (
            <span className=" line-clamp-1 max-w-xs">
                {info.getValue()}
            </span>
        )
    }),
    columnsHelper.accessor("userId", {
        header: "User"
    }),
    columnsHelper.accessor("body", {
        header: "Body",
        cell: info => (
            <span className=" line-clamp-1">
                {info.getValue()}
            </span>
        )
    })
]



export function PostTable(){
    const [pagination, setPagination] = useState<PaginationState>({
       pageIndex: 0,
       pageSize: 10 
    })

    const allposts  = GetAllPost();


    const table = useReactTable({
        data: allposts.data || [] ,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: { pagination}
    })
 return (
    <div className="w-full">
        <table className="w-full">
            <thead className="bg-gray-100 rounded-2xl">
                {
                    table.getHeaderGroups().map(headerGroups => {
                        return (
                            <tr key={headerGroups.id} className="">
                                {headerGroups.headers.map(header => (
                                    <th className="p-6 " key={header.id}> 
                                     {
                                        header.isPlaceholder ? null :
                                        flexRender(header.column.columnDef.header, header.getContext())
                                     }
                                    </th>
                                ))}
                            </tr>
                        )
                    })
                }
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map(post => (
                        <tr key={post.id}>
                            {post.getVisibleCells().map(cell => (
                                <td className="" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div className="flex justify-between">

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