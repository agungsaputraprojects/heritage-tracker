"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";
import { getCategoryIcon } from "@/data/heritageData";

const categories = [
    { value: "all", label: "Semua", icon: "🏛️" },
    { value: "temple", label: "Kuil/Candi", icon: "🛕" },
    { value: "palace", label: "Istana", icon: "🏰" },
    { value: "fort", label: "Benteng", icon: "🗿" },
    { value: "monument", label: "Monumen", icon: "🗿" },
    { value: "site", label: "Situs", icon: "🏞️" },
    { value: "museum", label: "Museum", icon: "🏛️" },
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
        // Loading skeleton
        return (
            <div className="space-y-4">
                <div className="relative">
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-8 w-20 bg-gray-200 rounded animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Cari tempat bersejarah, kota, atau negeri..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Kategori:</span>
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
                            className="h-8"
                        >
                            <span className="mr-1">{category.icon}</span>
                            {category.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== "all") && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                        Filter aktif:
                    </span>
                    {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                            <Search className="h-3 w-3" />"{searchQuery}"
                            <button
                                onClick={() => setSearchQuery("")}
                                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                            >
                                ×
                            </button>
                        </Badge>
                    )}
                    {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                            <Filter className="h-3 w-3" />
                            {
                                categories.find(
                                    (c) => c.value === selectedCategory
                                )?.label
                            }
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                            >
                                ×
                            </button>
                        </Badge>
                    )}
                    {(searchQuery || selectedCategory !== "all") && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="h-6 text-xs text-muted-foreground"
                        >
                            Hapus semua
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
