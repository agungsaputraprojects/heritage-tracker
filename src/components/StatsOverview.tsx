"use client";

import { MapPin, Heart, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";

export function StatsOverview() {
    const { places, getVisitedPlaces, getUnvisitedPlaces, isHydrated } =
        useHeritageStoreHydrated();

    if (!isHydrated) {
        // Loading skeleton
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const totalPlaces = places.length;
    const visitedPlaces = getVisitedPlaces().length;
    const unvisitedPlaces = getUnvisitedPlaces().length;
    const completionPercentage =
        totalPlaces > 0 ? Math.round((visitedPlaces / totalPlaces) * 100) : 0;

    const stats = [
        {
            title: "Total Tempat",
            value: totalPlaces,
            icon: MapPin,
            description: "Tempat bersejarah tersedia",
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-950",
        },
        {
            title: "Sudah Dikunjungi",
            value: visitedPlaces,
            icon: Heart,
            description: "Tempat yang telah dikunjungi",
            color: "text-red-600",
            bgColor: "bg-red-50 dark:bg-red-950",
        },
        {
            title: "Belum Dikunjungi",
            value: unvisitedPlaces,
            icon: Target,
            description: "Tempat untuk dijelajahi",
            color: "text-orange-600",
            bgColor: "bg-orange-50 dark:bg-orange-950",
        },
        {
            title: "Progress",
            value: `${completionPercentage}%`,
            icon: TrendingUp,
            description: "Persentase kunjungan",
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-950",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card
                        key={index}
                        className="transition-all duration-200 hover:shadow-md"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-md ${stat.bgColor}`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
