import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão de Escalas",
  description: "Passagem de plantão sem stress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

