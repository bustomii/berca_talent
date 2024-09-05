import { ColumnsDataTable, Sorting, Paginate } from "@/types"
import { useState } from "react"

const DataTables = ({
    data,
    columns,
    isLoading,
    page,
    GetPaginateData,
    searchColumn,
    setSearchColumn,
    sortingColumn,
    setSortingColumn,
    color,
    paginate
}: {
    data: any[],
    columns: ColumnsDataTable[],
    isLoading: boolean,
    page?: Paginate[],
    GetPaginateData?: (paginate: Paginate) => void,
    searchColumn?: boolean,
    setSearchColumn?: (searchColumn: Sorting) => void,
    sortingColumn?: boolean,
    setSortingColumn?: (sortingColumn: Sorting) => void,
    color?: string
    paginate?: boolean
}) => {
    const [search, setSearch] = useState<Sorting[]>([])
    const [sorting, setSorting] = useState<Sorting>({} as Sorting)

    return (
        <div className="w-full relative">
            <table className="w-full">
                <thead>
                    <tr >
                        {columns.map((column, index) => (
                            <th key={index}
                                style={{
                                    width: column.width ? column.width : ''
                                }}>
                                <div
                                    style={{
                                        background: color ? color : ''
                                    }}

                                    className={`${color ? '' : 'bg-indigo-500'} py-3 px-4 rounded text-white text-sm font-semibold truncate flex justify-between gap-2`}>
                                    <span>
                                        {column.name}
                                    </span>
                                    {sortingColumn !== false && column.sortable &&
                                        <button className="-space-y-1"
                                            onClick={() => {
                                                if (sorting && sorting.selector === column.selector && sorting.value === 'desc') {
                                                    setSortingColumn && setSortingColumn({
                                                        selector: column.selector,
                                                        value: 'asc'
                                                    })
                                                    setSorting({
                                                        selector: column.selector,
                                                        value: 'asc'
                                                    })
                                                } else {
                                                    setSortingColumn && setSortingColumn({
                                                        selector: column.selector,
                                                        value: 'desc'
                                                    })

                                                    setSorting({
                                                        selector: column.selector,
                                                        value: 'desc'
                                                    })
                                                }
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill={
                                                sorting && sorting.selector === column.selector && sorting.value === 'asc' ? 'white' : 'black'
                                            } viewBox="0 0 24 24" strokeWidth={3} stroke={
                                                sorting && sorting.selector === column.selector && sorting.value === 'asc' ? 'white' : 'black'
                                            } className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill={
                                                sorting && sorting.selector === column.selector && sorting.value === 'desc' ? 'white' : 'black'
                                            } viewBox="0 0 24 24" strokeWidth={3} stroke={
                                                sorting && sorting.selector === column.selector && sorting.value === 'desc' ? 'white' : 'black'
                                            } className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </th>
                        ))}
                    </tr>
                    {/* {searchColumn !== false && (
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>
                                    <input
                                        className={`w-full focus:outline-none focus:ring-0 focus:border-indigo-500 border-gray-300 py-3 px-4 rounded text-wrap text-gray-900 text-xs font-semibold`}
                                        placeholder={"Search " + column.name}
                                    />
                                </th>
                            ))}
                        </tr>
                    )} */}
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="border py-5 px-4 rounded text-wrap text-gray-900 text-xs font-semibold text-center">
                                <div className="flex justify-center w-full">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : data.length > 0 ? data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, indexColumn) => {
                                if (index % 2 === 0) {
                                    return (
                                        <td className="border bg-gray-100" key={indexColumn}><div className="py-2 px-4 flex items-center rounded text-wrap text-gray-900 text-xs font-semibold">{row[column.selector]}</div></td>
                                    )
                                } else {
                                    return (
                                        <td className="border" key={indexColumn}><div className="py-2 px-4 flex items-center rounded text-wrap text-gray-900 text-xs font-semibold">{row[column.selector]}</div></td>
                                    )
                                }
                            })}
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={columns.length} className="text-wrap text-gray-900 text-xs font-semibold">
                                <div className="flex items-center gap-2 flex-col justify-center w-full border rounded py-5 px-4 h-40">
                                    <p>Data is not available</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {paginate !== false &&
                <div className="flex justify-end mt-2 relative">
                    <div className="flex gap-1 mt-1 w-[max-content]">
                        {page && page?.map((paginate, index) => (
                            <div key={index} className={`flex gap-1 w-full items-center ${paginate.url ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => {
                                if (paginate && paginate.url) {
                                    GetPaginateData && GetPaginateData(paginate)
                                }
                            }}>
                                <div
                                    style={{
                                        background: color ? paginate.active ? color : 'white' : '',
                                        color: color ? paginate.active ? 'white' : 'black' : ''
                                    }}
                                    className={`${paginate.active ? 'bg-indigo-500 text-white font-bold' : ''} w-full min-w-8 flex items-center justify-center border h-8 rounded text-wrap text-gray-900 text-xs font-semibold`}>
                                    {
                                        index === 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                            </svg>
                                        ) : index === page.length - 1 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        ) : paginate.label
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default DataTables;
