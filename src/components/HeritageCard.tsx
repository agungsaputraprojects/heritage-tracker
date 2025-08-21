"use client";

import { Heart, MapPin, Star, Users, Clock, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeritagePlace } from "@/types/heritage";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";
import { getCategoryIcon, getCategoryColor } from "@/data/heritageData";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface HeritageCardProps {
    place: HeritagePlace;
    variant?: "default" | "compact";
}

export function HeritageCard({
    place,
    variant = "default",
}: HeritageCardProps) {
    const { toggleVisited, isHydrated } = useHeritageStoreHydrated();
    const [imageError, setImageError] = useState(false);

    const handleToggleVisited = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isHydrated) {
            toggleVisited(place.id);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    if (variant === "compact") {
        return (
            <Link href={`/place/${place.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex">
                        <div className="relative w-32 h-24 flex-shrink-0 bg-gray-200">
                            {!imageError ? (
                                <Image
                                    src={place.image}
                                    alt={place.name}
                                    fill
                                    className="object-cover rounded-l-lg"
                                    onError={handleImageError}
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-l-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">
                                        No Image
                                    </span>
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white transition-colors",
                                    isHydrated &&
                                        place.isVisited &&
                                        "text-red-500"
                                )}
                                onClick={handleToggleVisited}
                            >
                                <Heart
                                    className={cn(
                                        "h-4 w-4",
                                        isHydrated &&
                                            place.isVisited &&
                                            "fill-current"
                                    )}
                                />
                            </Button>
                        </div>
                        <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem] flex items-start">
                                    {place.name}
                                </h3>
                                <Badge
                                    className={getCategoryColor(place.category)}
                                >
                                    {getCategoryIcon(place.category)}{" "}
                                    {place.category}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {place.location.city}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {place.rating}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }

    return (
        <Link href={`/place/${place.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200 flex-shrink-0">
                    {!imageError ? (
                        <Image
                            src={place.image}
                            alt={place.name}
                            width={800}
                            height={600}
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={handleImageError}
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">
                                No Image Available
                            </span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute top-3 right-3 h-10 w-10 rounded-full bg-white/80 hover:bg-white transition-colors",
                            isHydrated && place.isVisited && "text-red-500"
                        )}
                        onClick={handleToggleVisited}
                    >
                        <Heart
                            className={cn(
                                "h-5 w-5",
                                isHydrated && place.isVisited && "fill-current"
                            )}
                        />
                    </Button>

                    <Badge
                        className={cn(
                            getCategoryColor(place.category),
                            "absolute top-3 left-3"
                        )}
                    >
                        {getCategoryIcon(place.category)} {place.category}
                    </Badge>

                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1 text-white text-sm mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{place.rating}</span>
                            <span className="text-white/80">
                                ({formatNumber(place.visitCount)} pengunjung)
                            </span>
                        </div>
                    </div>
                </div>

                <CardHeader className="pb-2 flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] flex items-start leading-tight">
                            {place.name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                            {place.location.city}, {place.location.province}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {place.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">
                                    {place.openingHours.open} -{" "}
                                    {place.openingHours.close}
                                </p>
                                <p className="text-muted-foreground">
                                    {place.openingHours.days}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">
                                    {formatCurrency(place.ticketPrice.local)}
                                </p>
                                <p className="text-muted-foreground">
                                    Domestik
                                </p>
                            </div>
                        </div>
                    </div>

                    {place.highlights.length > 0 && (
                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-1">
                                {place.highlights
                                    .slice(0, 2)
                                    .map((highlight: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {highlight}
                                        </Badge>
                                    ))}
                                {place.highlights.length > 2 && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        +{place.highlights.length - 2} lainnya
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
