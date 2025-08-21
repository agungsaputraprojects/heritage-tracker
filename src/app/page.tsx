"use client";

import { useState, useEffect, useRef } from "react";
import { Grid, List, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeritageCard } from "@/components/HeritageCard";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { StatsOverview } from "@/components/StatsOverview";
import { Pagination } from "@/components/Pagination";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";

const ITEMS_PER_PAGE = 9;

export default function HomePage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const { getFilteredPlaces, getRandomPlace, isHydrated } =
        useHeritageStoreHydrated();

    const resultsRef = useRef<HTMLElement>(null);

    const filteredPlaces = isHydrated ? getFilteredPlaces() : [];

    const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredPlaces.length]);

    const handleRandomSuggestion = () => {
        if (!isHydrated) return;

        const randomPlace = getRandomPlace();
        if (randomPlace) {
            window.location.href = `/place/${randomPlace.id}`;
        } else {
            alert("You've visited all places! 🎉");
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        if (resultsRef.current) {
            const yOffset = -20;
            const y =
                resultsRef.current.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="py-8 space-y-8">
            <section className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-orange-600" />
                    Explore Malaysia&apos;s Cultural Heritage
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent md:h-20 h-16">
                    Heritage Tracker
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover, visit, and mark historical places in Malaysia.
                    Start your journey exploring Malaysia&apos;s rich cultural
                    heritage.
                </p>
            </section>

            <StatsOverview />

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-orange-600" />
                        Fun Features
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-semibold mb-1">
                                Don&apos;t know where to go?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Let us suggest a historical place you
                                haven&apos;t visited yet, chosen at random!
                            </p>
                        </div>
                        <Button
                            onClick={handleRandomSuggestion}
                            disabled={!isHydrated}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 flex-shrink-0"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            {isHydrated ? "Random Suggestion" : "Loading..."}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <SearchAndFilter />

            <section ref={resultsRef} className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {!isHydrated
                                ? "Loading..."
                                : filteredPlaces.length > 0
                                ? `${filteredPlaces.length} Historical Places Found`
                                : "No matching places found"}
                        </h2>
                        <p className="text-muted-foreground">
                            {!isHydrated
                                ? "Loading historical places data..."
                                : filteredPlaces.length > 0
                                ? totalPages > 1
                                    ? `Page ${currentPage} of ${totalPages} • ${currentPlaces.length} places displayed`
                                    : "Click on a card to view full details"
                                : "Try different keywords or remove filters"}
                        </p>
                    </div>

                    {isHydrated && filteredPlaces.length > 0 && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="transition-all duration-200"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="transition-all duration-200"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>

                {!isHydrated && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Card key={index} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {isHydrated && currentPlaces.length > 0 && (
                    <>
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    : "space-y-4"
                            }
                        >
                            {currentPlaces.map((place) => (
                                <HeritageCard
                                    key={place.id}
                                    place={place}
                                    variant={
                                        viewMode === "list"
                                            ? "compact"
                                            : "default"
                                    }
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                itemsPerPage={ITEMS_PER_PAGE}
                                totalItems={filteredPlaces.length}
                            />
                        )}
                    </>
                )}

                {isHydrated && filteredPlaces.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-lg font-semibold mb-2">
                            No places found
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Try using different keywords or remove filters
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="hover:bg-orange-50 hover:border-orange-300"
                        >
                            Reset Search
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
