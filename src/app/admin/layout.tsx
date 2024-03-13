import { AdminSidebar } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | Administrador',
        default: 'ADMIN'
    },
    description: 'Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen antialiased selection:bg-blue-600 selection:text-white overflow-y-auto">

            <div className="flex">

                <div className="relative">
                    <AdminSidebar />
                </div>

                <div className="w-full">
                    {children}
                </div>

            </div>
        </div>
    );
}