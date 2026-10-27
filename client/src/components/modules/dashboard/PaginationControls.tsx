"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaginationControls({
  page,
  pageSize,
  canPrevious,
  canNext,
  totalItems,
  itemLabel = "items",
  pageSizeLabel = "Items per page",
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  canPrevious: boolean;
  canNext: boolean;
  totalItems?: number;
  itemLabel?: string;
  pageSizeLabel?: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}) {
  const rangeStart = totalItems ? (page - 1) * pageSize + 1 : 0;
  const rangeEnd = totalItems ? Math.min(page * pageSize, totalItems) : 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="dashboard-page-size" className="flex items-center gap-2 text-xs text-muted-foreground">
          {pageSizeLabel}
          <select
            id="dashboard-page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.currentTarget.value))}
            className="h-8 rounded-lg border border-border bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            {[5, 10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        {totalItems !== undefined && (
          <span className="text-xs text-muted-foreground">
            Showing {rangeStart}–{rangeEnd} of {totalItems} {itemLabel}
          </span>
        )}
      </div>
      <nav aria-label="Pagination" className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={!canPrevious}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeft className="size-4" aria-hidden="true" /> Previous
        </Button>
        <span className="min-w-16 text-center text-sm text-muted-foreground">Page {page}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}
