import type { Metadata } from "next";

import "./globals.css";
import { montserrat } from "@/config/fonts";
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
    <html lang="es" data-theme="light">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
