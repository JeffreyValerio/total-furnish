import type { Metadata } from "next";

import "./globals.css";
import { Footer, Header, Sidebar } from "@/components";
import { poppins } from "@/config/fonts";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: {
    template: '%s | Total Furnish',
    default: 'SIN TEXTO | Total Furnish'
  },
  description: 'Total Furnish',
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <Providers>
          <Sidebar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
