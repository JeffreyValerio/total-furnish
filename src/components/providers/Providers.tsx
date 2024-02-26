import { ToastProvider } from "./ToastifyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
}