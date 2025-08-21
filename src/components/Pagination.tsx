import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    totalItems: number;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, start + maxVisible - 1);

            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push("...");
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push("...");
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col items-center gap-4 py-8">
            {/* Info Text */}
            <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-gray-900">{startItem}</span> -{" "}
                <span className="font-medium text-gray-900">{endItem}</span> of{" "}
                <span className="font-medium text-gray-900">{totalItems}</span>{" "}
                historical places
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 px-3 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {getVisiblePages().map((page, index) => (
                        <div key={index}>
                            {page === "..." ? (
                                <span className="px-3 py-2 text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <Button
                                    variant={
                                        currentPage === page
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => onPageChange(page as number)}
                                    className={`h-9 w-9 p-0 transition-all duration-200 ${
                                        currentPage === page
                                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                                            : "border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                                    }`}
                                >
                                    {page}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 border-gray-200 hover:border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            {/* Quick Jump (optional for large datasets) */}
            {totalPages > 10 && (
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Jump to page:</span>
                    <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                            const page = parseInt(e.target.value);
                            if (page >= 1 && page <= totalPages) {
                                onPageChange(page);
                            }
                        }}
                        className="w-16 h-8 px-2 text-center border border-gray-200 rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
                    />
                    <span className="text-muted-foreground">
                        of {totalPages}
                    </span>
                </div>
            )}
        </div>
    );
}
