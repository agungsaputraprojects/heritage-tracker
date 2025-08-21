import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Heritage Tracker - Explore Malaysia's Heritage",
    description:
        "Discover and visit historical places in Malaysia. Mark visited places and explore Malaysia's rich cultural heritage.",
    keywords:
        "heritage, malaysia, temples, palaces, museums, historical tourism, malaysian culture, melaka, kuala lumpur",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-background">
                    <Header />
                    <main className="max-w-6xl mx-auto px-4 pb-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
