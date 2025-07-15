'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export default function TablePagination({
  currentPage,
  pageSize,
  totalItems,
}: TablePaginationProps) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    return `?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            
              <Link href={getPageHref(currentPage - 1)}>
              <PaginationPrevious className="hover:text-white hover:!bg-sky-950 transition-colors duration-500">
              Previous
              </PaginationPrevious>
              </Link>
            
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={getPageHref(page)}
              isActive={page === currentPage}
              className="hover:text-white hover:!bg-sky-950 transition-colors duration-500"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            
              <Link href={getPageHref(currentPage + 1)}>
              
              <PaginationNext className="hover:text-white hover:!bg-sky-950 transition-colors duration-500"></PaginationNext>
              </Link>
            
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
