export interface HeritagePlace {
    id: string;
    name: string;
    description: string;
    image: string;
    location: {
        city: string;
        province: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    category: "temple" | "palace" | "fort" | "monument" | "site" | "museum";
    yearEstablished: number;
    isVisited: boolean;
    rating: number;
    visitCount: number;
    highlights: string[];
    openingHours: {
        open: string;
        close: string;
        days: string;
    };
    ticketPrice: {
        local: number;
        foreign: number;
    };
}

export interface VisitedPlace {
    placeId: string;
    visitedDate: Date;
    rating?: number;
    notes?: string;
}

export type CategoryType = HeritagePlace["category"];
