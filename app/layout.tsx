import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarComponent from "./components/Navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FAVOME",
  description: "About Favome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <NavBarComponent/>
        
        {children}

        <Footer/>
      </body>
    </html>
  );
}
