"use client";

import { Heart, MapPin, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeritageCard } from "@/components/HeritageCard";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";
import Link from "next/link";

export default function VisitedPage() {
    const { getVisitedPlaces, places, isHydrated, getRandomPlace } =
        useHeritageStoreHydrated();

    if (!isHydrated) {
        return (
            <div className="py-8 space-y-8">
                <div className="text-center space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="animate-pulse">
                            <div className="p-6">
                                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const visitedPlaces = getVisitedPlaces();
    const totalPlaces = places.length;
    const completionPercentage =
        totalPlaces > 0
            ? Math.round((visitedPlaces.length / totalPlaces) * 100)
            : 0;

    // Group visited places by category
    const placesByCategory = visitedPlaces.reduce((acc, place) => {
        if (!acc[place.category]) {
            acc[place.category] = [];
        }
        acc[place.category].push(place);
        return acc;
    }, {} as Record<string, typeof visitedPlaces>);

    const categoryLabels = {
        temple: "Temples",
        palace: "Palaces",
        fort: "Forts",
        monument: "Monuments",
        site: "Sites",
        museum: "Museums",
    };

    const handleRandomPlace = () => {
        const randomPlace = getRandomPlace();
        if (randomPlace) {
            window.location.href = `/place/${randomPlace.id}`;
        }
    };

    return (
        <div className="py-8 space-y-8">
            {/* Header */}
            <section className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-950 dark:to-pink-950 px-4 py-2 rounded-full text-sm font-medium">
                    <Heart className="h-4 w-4 text-red-600" />
                    Your Heritage Journey
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                    Visited Places
                </h1>
                <p className="text-lg text-muted-foreground">
                    Collection of historical places you&apos;ve explored
                </p>
            </section>

            {visitedPlaces.length > 0 ? (
                <>
                    {/* Progress Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Visited
                                </CardTitle>
                                <Heart className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">
                                    {visitedPlaces.length}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    out of {totalPlaces} places available
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Progress
                                </CardTitle>
                                <Trophy className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {completionPercentage}%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${completionPercentage}%`,
                                        }}
                                    ></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Most Visited Category
                                </CardTitle>
                                <MapPin className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    {Object.keys(placesByCategory).length > 0
                                        ? categoryLabels[
                                              Object.keys(
                                                  placesByCategory
                                              ).reduce((a, b) =>
                                                  placesByCategory[a].length >
                                                  placesByCategory[b].length
                                                      ? a
                                                      : b
                                              ) as keyof typeof categoryLabels
                                          ]
                                        : "-"}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {Object.keys(placesByCategory).length}{" "}
                                    category types
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Achievement Badges */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-600" />
                                Your Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {visitedPlaces.length >= 1 && (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        🎯 Beginner Explorer
                                    </Badge>
                                )}
                                {visitedPlaces.length >= 3 && (
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                        🗺️ Heritage Adventurer
                                    </Badge>
                                )}
                                {visitedPlaces.length >= 5 && (
                                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                        🏛️ History Lover
                                    </Badge>
                                )}
                                {completionPercentage >= 50 && (
                                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                                        🔥 Half Explorer
                                    </Badge>
                                )}
                                {Object.keys(placesByCategory).length >= 3 && (
                                    <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                                        🌟 Category Master
                                    </Badge>
                                )}
                                {completionPercentage === 100 && (
                                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                        👑 Heritage Champion
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visited Places by Category */}
                    <section className="space-y-6">
                        {Object.entries(placesByCategory).map(
                            ([category, categoryPlaces]) => (
                                <div key={category}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <h2 className="text-xl font-semibold">
                                            {
                                                categoryLabels[
                                                    category as keyof typeof categoryLabels
                                                ]
                                            }
                                        </h2>
                                        <Badge variant="outline">
                                            {categoryPlaces.length} places
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryPlaces.map((place) => (
                                            <HeritageCard
                                                key={place.id}
                                                place={place}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                </>
            ) : (
                /* Empty State */
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h3 className="text-2xl font-semibold mb-2">
                        No places visited yet
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Start exploring Malaysia&apos;s cultural heritage by
                        marking the places you&apos;ve visited
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button size="lg">
                                <MapPin className="h-4 w-4 mr-2" />
                                Explore Places
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleRandomPlace}
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Random Place
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
