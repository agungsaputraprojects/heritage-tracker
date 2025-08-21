"use client";

import { useState } from "react";
import { Grid, List, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeritageCard } from "@/components/HeritageCard";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { StatsOverview } from "@/components/StatsOverview";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";

export default function HomePage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const { getFilteredPlaces, getRandomPlace, isHydrated } =
        useHeritageStoreHydrated();

    const filteredPlaces = isHydrated ? getFilteredPlaces() : [];

    const handleRandomSuggestion = () => {
        if (!isHydrated) return;

        const randomPlace = getRandomPlace();
        if (randomPlace) {
            window.location.href = `/place/${randomPlace.id}`;
        } else {
            alert("Anda sudah mengunjungi semua tempat! 🎉");
        }
    };

    return (
        <div className="py-8 space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-orange-600" />
                    Jelajahi Warisan Budaya Malaysia
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
                    Heritage Tracker
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Temukan, kunjungi, dan tandai tempat-tempat bersejarah di
                    Malaysia. Mulai perjalanan Anda menjelajahi warisan budaya
                    Malaysia yang kaya.
                </p>
            </section>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Fun Feature Section */}
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-orange-600" />
                        Fitur Menyenangkan
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-semibold mb-1">
                                Tidak tahu mau ke mana?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Biarkan kami menyarankan tempat bersejarah yang
                                belum Anda kunjungi secara acak!
                            </p>
                        </div>
                        <Button
                            onClick={handleRandomSuggestion}
                            disabled={!isHydrated}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 flex-shrink-0"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            {isHydrated ? "Saran Tempat Acak" : "Loading..."}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Search and Filter */}
            <section>
                <SearchAndFilter />
            </section>

            {/* View Mode Toggle & Results */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {!isHydrated
                                ? "Loading..."
                                : filteredPlaces.length > 0
                                ? `${filteredPlaces.length} Tempat Bersejarah Ditemukan`
                                : "Tidak ada tempat yang sesuai"}
                        </h2>
                        <p className="text-muted-foreground">
                            {!isHydrated
                                ? "Memuat data tempat bersejarah..."
                                : filteredPlaces.length > 0
                                ? "Klik pada kartu untuk melihat detail lengkap"
                                : "Coba ubah filter atau kata kunci pencarian"}
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
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {!isHydrated && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
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

                {/* Places Grid/List */}
                {isHydrated && filteredPlaces.length > 0 && (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }
                    >
                        {filteredPlaces.map((place) => (
                            <HeritageCard
                                key={place.id}
                                place={place}
                                variant={
                                    viewMode === "list" ? "compact" : "default"
                                }
                            />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {isHydrated && filteredPlaces.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-lg font-semibold mb-2">
                            Tidak ada tempat yang ditemukan
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Coba gunakan kata kunci yang berbeda atau hapus
                            filter
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                        >
                            Reset Pencarian
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
