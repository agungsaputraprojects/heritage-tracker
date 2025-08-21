"use client";

import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Heart,
    MapPin,
    Star,
    Clock,
    Ticket,
    Users,
    Calendar,
    Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHeritageStore } from "@/store/useHeritageStore";
import { getCategoryIcon, getCategoryColor } from "@/data/heritageData";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import Image from "next/image";

export default function PlaceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { getPlaceById, toggleVisited } = useHeritageStore();
    const place = getPlaceById(id);

    if (!place) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h3 className="text-2xl font-semibold mb-2">
                        Place not found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        The historical place you&apos;re looking for
                        doesn&apos;t exist in our database
                    </p>
                    <Button onClick={() => router.push("/")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    const handleToggleVisited = () => {
        toggleVisited(place.id);
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: place.name,
                text: place.description,
                url: window.location.href,
            });
        } catch {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link successfully copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Image Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <Image
                    src={place.image}
                    alt={place.name}
                    width={1200}
                    height={800}
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Navigation & Actions */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShare}
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                        >
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleToggleVisited}
                            className={cn(
                                "bg-white/20 hover:bg-white/30 border-white/20",
                                place.isVisited ? "text-red-500" : "text-white"
                            )}
                        >
                            <Heart
                                className={cn(
                                    "h-5 w-5",
                                    place.isVisited && "fill-current"
                                )}
                            />
                        </Button>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="container mx-auto">
                        <Badge
                            className={cn(
                                getCategoryColor(place.category),
                                "mb-4"
                            )}
                        >
                            {getCategoryIcon(place.category)} {place.category}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {place.name}
                        </h1>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>
                                    {place.location.city},{" "}
                                    {place.location.province}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{place.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>
                                    {formatNumber(place.visitCount)} visitors
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Opening Hours
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {place.openingHours.open} -{" "}
                                {place.openingHours.close}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {place.openingHours.days}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ticket Price
                            </CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(place.ticketPrice.local)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Foreign:{" "}
                                {formatCurrency(place.ticketPrice.foreign)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Year Established
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {place.yearEstablished}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {new Date().getFullYear() -
                                    place.yearEstablished}{" "}
                                years ago
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Visit Status */}
                <Card
                    className={cn(
                        "border-2",
                        place.isVisited
                            ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                            : "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800"
                    )}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "p-3 rounded-full",
                                        place.isVisited
                                            ? "bg-green-100 dark:bg-green-900"
                                            : "bg-orange-100 dark:bg-orange-900"
                                    )}
                                >
                                    <Heart
                                        className={cn(
                                            "h-6 w-6",
                                            place.isVisited
                                                ? "text-green-600 fill-current"
                                                : "text-orange-600"
                                        )}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        {place.isVisited
                                            ? "Already Visited"
                                            : "Not Visited Yet"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {place.isVisited
                                            ? "You have visited this place"
                                            : "Mark as visited after your visit"}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handleToggleVisited}
                                variant={
                                    place.isVisited ? "outline" : "default"
                                }
                                className={
                                    place.isVisited
                                        ? "border-green-500 text-green-600 hover:bg-green-50"
                                        : ""
                                }
                            >
                                {place.isVisited ? "Unmark" : "Mark as Visited"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Description */}
                <Card>
                    <CardHeader>
                        <CardTitle>About {place.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            {place.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Highlights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Highlights & Attractions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {place.highlights.map(
                                (highlight: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                        <span className="text-sm">
                                            {highlight}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Location Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">
                                        {place.location.city},{" "}
                                        {place.location.province}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Coordinates:{" "}
                                        {place.location.coordinates.lat},{" "}
                                        {place.location.coordinates.lng}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" onClick={() => router.push("/")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.push("/visited")}
                    >
                        <Heart className="h-4 w-4 mr-2" />
                        View Visited Places
                    </Button>
                </div>
            </div>
        </div>
    );
}
