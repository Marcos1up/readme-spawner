import "../styles/globals.css";
import { Providers } from "../store/provider";
import { Inter } from "next/font/google";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] }); //importar la fuente inter

export const metadata: Metadata = {
  title: "README Spawner | Generador de archivos README",
  description: "Aplicación web para generar archivos README.md de manera eficiente y personalizada",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="app-container">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
