"use client";

import React from "react";
import Link from "next/link";

interface PaginationProps {
    pageCount: number;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage }) => {
    if (pageCount <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < pageCount ? currentPage + 1 : null;

    return (
        <div className="flex justify-center py-6 gap-2 text-sm select-none">
            {prevPage && (
                <Link
                    href={`/store?page=${prevPage}&per_page=12`}
                    className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 transition"
                >
                    ‹ قبلی
                </Link>
            )}

            {Array.from({ length: pageCount }, (_, i) => (
                <Link
                    key={i}
                    href={`/store?page=${i + 1}&per_page=12`}
                    className={`px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 transition ${
                        currentPage === i + 1 ? "bg-blue-600 text-white border-blue-600" : ""
                    }`}
                >
                    {i + 1}
                </Link>
            ))}

            {nextPage && (
                <Link
                    href={`/store?page=${nextPage}&per_page=12`}
                    className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 transition"
                >
                    بعدی ›
                </Link>
            )}
        </div>
    );
};

export default Pagination;
