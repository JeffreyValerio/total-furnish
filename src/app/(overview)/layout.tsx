import { Footer, Header, Sidebar } from "@/components";

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidebar />
            <Header />
            {children}
            <Footer />
        </div>
    );
}