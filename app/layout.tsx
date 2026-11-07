import type { Metadata, Viewport } from "next";
import { Rethink_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Una sola familia variable: los titulares se distinguen por tamaño, no por peso.
const rethink = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.nombre} | Caminos, calles y rutas`,
  description:
    "Constructora vial: pavimento asfáltico y de hormigón, movimiento de suelos, bacheo, drenaje y señalización. Pedí tu presupuesto.",
  other: {
    "page-type": "service",
    "site-kind": "other",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f2ee",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      data-type="service"
      data-radius="sharp"
      data-motion
      className={rethink.variable}
    >
      <body>{children}</body>
    </html>
  );
}
