"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";

const categories = [
    { value: "all", label: "All", icon: "🏛️" },
    { value: "temple", label: "Temples", icon: "🛕" },
    { value: "palace", label: "Palaces", icon: "🏰" },
    { value: "fort", label: "Forts", icon: "🗿" },
    { value: "monument", label: "Monuments", icon: "🗿" },
    { value: "site", label: "Sites", icon: "🏞️" },
    { value: "museum", label: "Museums", icon: "🏛️" },
];

export function SearchAndFilter() {
    const {
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        isHydrated,
    } = useHeritageStoreHydrated();

    if (!isHydrated) {
        return (
            <div className="space-y-6 py-6">
                <div className="relative">
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 py-6">
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                    <Input
                        placeholder="Search historical places, cities, or states..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-12 h-12 text-base rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Filter className="h-4 w-4" />
                        <span>Categories:</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category.value}
                            variant={
                                selectedCategory === category.value
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(category.value)}
                            className={`h-10 px-4 rounded-full transition-all duration-200 ${
                                selectedCategory === category.value
                                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:scale-105"
                            }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                        </Button>
                    ))}
                </div>
            </div>

            {(searchQuery || selectedCategory !== "all") && (
                <div className="flex items-center gap-3 flex-wrap p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Active filters:
                    </span>

                    <div className="flex flex-wrap gap-2">
                        {searchQuery && (
                            <Badge
                                variant="secondary"
                                className="gap-2 pl-3 pr-2 py-1.5 bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-700"
                            >
                                <Search className="h-3 w-3" />
                                <span>&quot;{searchQuery}&quot;</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchQuery("")}
                                    className="h-4 w-4 p-0 hover:bg-orange-200 rounded-full ml-1"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}

                        {selectedCategory !== "all" && (
                            <Badge
                                variant="secondary"
                                className="gap-2 pl-3 pr-2 py-1.5 bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-700"
                            >
                                <span>
                                    {
                                        categories.find(
                                            (c) => c.value === selectedCategory
                                        )?.icon
                                    }
                                </span>
                                <span>
                                    {
                                        categories.find(
                                            (c) => c.value === selectedCategory
                                        )?.label
                                    }
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedCategory("all")}
                                    className="h-4 w-4 p-0 hover:bg-orange-200 rounded-full ml-1"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        )}
                    </div>

                    {(searchQuery || selectedCategory !== "all") && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="h-8 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded-full px-3"
                        >
                            Clear all
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
