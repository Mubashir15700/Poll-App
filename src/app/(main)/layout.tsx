"use client"
import Navbar from "@/components/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <div className="container mx-auto pt-16">
                {children}
            </div>
        </>
    )
}
