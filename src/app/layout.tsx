import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora Concierge Inmobiliario | Demo Oficial Luma Premium",
  description:
    "Concierge inmobiliario demo para responder preguntas frecuentes, filtrar prospectos y preparar al asesor con información clara antes de la llamada o cita.",
  keywords: ["concierge inmobiliario", "demo", "luma premium", "calificación de prospectos", "aurora"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
