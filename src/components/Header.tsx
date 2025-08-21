"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MapPin, Shuffle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHeritageStoreHydrated } from "@/store/useHeritageStore";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
    const pathname = usePathname();
    const { getVisitedPlaces, getRandomPlace, isHydrated } =
        useHeritageStoreHydrated();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const visitedCount = isHydrated ? getVisitedPlaces().length : 0;

    const handleRandomPlace = () => {
        if (!isHydrated) return;
        const randomPlace = getRandomPlace();
        if (randomPlace) {
            window.location.href = `/place/${randomPlace.id}`;
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 min-w-0"
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex-shrink-0">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold truncate">
                                Heritage Tracker
                            </h1>
                            <p className="text-xs text-muted-foreground truncate">
                                Jelajahi Warisan Malaysia
                            </p>
                        </div>
                        <div className="md:hidden">
                            <h1 className="text-lg font-bold truncate">
                                Heritage Tracker
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link href="/visited">
                            <Button
                                variant={
                                    pathname === "/visited"
                                        ? "default"
                                        : "ghost"
                                }
                                size="sm"
                                className="relative"
                            >
                                <Heart className="h-4 w-4 mr-2" />
                                Sudah Dikunjungi
                                {visitedCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                                    >
                                        {visitedCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* Random Place Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRandomPlace}
                            disabled={!isHydrated}
                            className="ml-2"
                        >
                            <Shuffle className="h-4 w-4 mr-2" />
                            Tempat Acak
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t">
                        <nav className="py-4 space-y-2">
                            <Link href="/visited">
                                <Button
                                    variant={
                                        pathname === "/visited"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="w-full justify-start relative"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Heart className="h-4 w-4 mr-2" />
                                    Sudah Dikunjungi
                                    {visitedCount > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs"
                                        >
                                            {visitedCount}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>

                            {/* Random Place Button Mobile */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRandomPlace}
                                disabled={!isHydrated}
                                className="w-full justify-start"
                            >
                                <Shuffle className="h-4 w-4 mr-2" />
                                {isHydrated ? "Tempat Acak" : "Loading..."}
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
