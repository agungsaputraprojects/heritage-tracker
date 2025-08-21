import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Heritage Tracker - Jelajahi Warisan Malaysia",
    description:
        "Temukan dan kunjungi tempat-tempat bersejarah di Malaysia. Tandai tempat yang sudah dikunjungi dan jelajahi warisan budaya Malaysia yang kaya.",
    keywords:
        "heritage, malaysia, kuil, istana, museum, wisata sejarah, budaya malaysia, melaka, kuala lumpur",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
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
