"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HeritagePlace } from "@/types/heritage";
import { heritageData } from "@/data/heritageData";
import { useEffect, useState } from "react";

interface HeritageStore {
    places: HeritagePlace[];
    searchQuery: string;
    selectedCategory: string;
    toggleVisited: (placeId: string) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string) => void;
    getRandomPlace: () => HeritagePlace | null;
    getVisitedPlaces: () => HeritagePlace[];
    getUnvisitedPlaces: () => HeritagePlace[];
    getFilteredPlaces: () => HeritagePlace[];
    getPlaceById: (id: string) => HeritagePlace | undefined;
}

export const useHeritageStore = create<HeritageStore>()(
    persist(
        (set, get) => ({
            places: heritageData,
            searchQuery: "",
            selectedCategory: "all",

            toggleVisited: (placeId: string) => {
                set((state) => ({
                    places: state.places.map((place) =>
                        place.id === placeId
                            ? { ...place, isVisited: !place.isVisited }
                            : place
                    ),
                }));
            },

            setSearchQuery: (query: string) => {
                set({ searchQuery: query });
            },

            setSelectedCategory: (category: string) => {
                set({ selectedCategory: category });
            },

            getRandomPlace: () => {
                const { places } = get();
                const unvisitedPlaces = places.filter(
                    (place) => !place.isVisited
                );
                if (unvisitedPlaces.length === 0) return null;

                const randomIndex = Math.floor(
                    Math.random() * unvisitedPlaces.length
                );
                return unvisitedPlaces[randomIndex];
            },

            getVisitedPlaces: () => {
                const { places } = get();
                return places.filter((place) => place.isVisited);
            },

            getUnvisitedPlaces: () => {
                const { places } = get();
                return places.filter((place) => !place.isVisited);
            },

            getFilteredPlaces: () => {
                const { places, searchQuery, selectedCategory } = get();

                return places.filter((place) => {
                    const matchesSearch =
                        place.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        place.location.city
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        place.location.province
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        place.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase());

                    const matchesCategory =
                        selectedCategory === "all" ||
                        place.category === selectedCategory;

                    return matchesSearch && matchesCategory;
                });
            },

            getPlaceById: (id: string) => {
                const { places } = get();
                return places.find((place) => place.id === id);
            },
        }),
        {
            name: "heritage-storage",
            skipHydration: true,
        }
    )
);

export const useHeritageStoreHydrated = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const store = useHeritageStore();

    useEffect(() => {
        useHeritageStore.persist.rehydrate();
        setIsHydrated(true);
    }, []);

    return {
        ...store,
        isHydrated,
    };
};
