import { PaginatedResponse } from "@/src/types";
import Link from "next/link";

interface PaginatedProps {
  pagination: PaginatedResponse<any>["pagination"];
  basePath: string;
}

export default function Pagination({ pagination, basePath }: PaginatedProps) {
  const { currentPage, totalPages } = pagination;

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`}>Previous</Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`}>Next</Link>
      )}
    </div>
  );
}
