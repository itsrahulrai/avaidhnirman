"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

interface Complaint {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  subject: string;
  message: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Page = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState(''); // State for global search filter

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/complaints");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        if (json.success) {
          setComplaints(json.data);
        } else {
          throw new Error(json.message || "Failed to fetch complaints.");
        }
      } catch (err: any) {
        console.error("Error fetching complaints:", err);
        setError(err.message || "An error occurred while fetching complaints.");
        toast.error(err.message || "Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleDeleteComplaint = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete this complaint.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Complaint deleted successfully!");
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
      } else {
        toast.error(data.message || "Failed to delete complaint.");
      }
    } catch (err) {
      console.error("Error deleting complaint:", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Define columns for React Table
  const columns = useMemo<ColumnDef<Complaint>[]>(
    () => [
      {
        accessorKey: 'images',
        header: 'Images',
        cell: info => (
         <div className="flex items-center space-x-3">
  {info.getValue<string[]>()?.length > 0 ? (
    <>
      <div className="flex -space-x-3">
        {info.getValue<string[]>()!.slice(0, 3).map((img, index) => (
          <a key={index} href={img} download target="_blank" rel="noopener noreferrer">
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded border-2 border-white object-cover shadow-md hover:ring-2 hover:ring-blue-500 transition-all"
            />
          </a>
        ))}
      </div>

      {info.getValue<string[]>()!.length > 3 && (
        <div className="h-32 w-32 rounded border-2 border-white bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold shadow-md">
          +{info.getValue<string[]>()!.length - 3}
        </div>
      )}
    </>
  ) : (
    <span className="text-base text-gray-400">No Images</span>
  )}
</div>


        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        cell: info => info.getValue<string>(),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: info => info.getValue<string>(),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: info => info.getValue<string>(),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: info => info.getValue<string>(),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
        cell: info => info.getValue<string>(),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'message',
        header: 'Message',
        cell: info => (
          <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={info.getValue<string>()}>
            {info.getValue<string>()}
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: true,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <button
              title="Delete"
              onClick={() => handleDeleteComplaint(row.original._id)}
              className="p-1 text-gray-500 hover:text-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: complaints,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <p className="text-gray-700">Loading complaints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center flex-col">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Page Header and Add Complaint Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Global Search Input */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#CA3500] text-white">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-left font-semibold text-xs uppercase tracking-wider cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-orange-50 transition-colors duration-200">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-gray-100">
            {table.getRowModel().rows.map(row => (
              <div key={row.id} className="p-4 bg-white shadow-sm rounded-lg mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{row.original.fullName}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Email:</span> {row.original.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Phone:</span> {row.original.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Location:</span> {row.original.location}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">

                    <button
                      onClick={() => handleDeleteComplaint(row.original._id)}
                      className="text-gray-500 hover:text-red-600 p-1 rounded-full bg-gray-100"
                      title="Delete Complaint"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Subject:</span> {row.original.subject}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Message:</span> {row.original.message}
                  </p>
                </div>

                {row.original.images && row.original.images.length > 0 && (
                  <div className="flex mt-3 space-x-2 overflow-x-auto pb-2">
                    {row.original.images.map((img, index) => (
                      <Image
                        key={index}
                        className="flex-shrink-0 h-16 w-16 rounded object-cover ring-1 ring-gray-200"
                        src={img}
                        alt={`Complaint image ${index + 1}`}
                        width={64}
                        height={64}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {complaints.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No complaints found</div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {complaints.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
              {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of{" "}
              {table.getFilteredRowModel().rows.length} results
              {globalFilter && ` (filtered from ${complaints.length})`}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              {table.getPageOptions().map((pageNumber, i) => (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 text-sm rounded-md ${table.getState().pagination.pageIndex === i
                      ? "bg-orange-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;