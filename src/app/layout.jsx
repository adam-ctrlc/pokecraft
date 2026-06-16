import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { FONT_HREF } from "@/config/sprites";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-minecraft",
  subsets: ["latin"],
});

export const metadata = {
  title: "PokeCraft - Pokemon Wiki",
  description: "A Minecraft-themed Pokemon Wiki",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href={FONT_HREF.pokemonSolid} rel="stylesheet" />
      </head>
      <body
        className={`${pressStart2P.variable} antialiased min-h-screen flex flex-col bg-[#111] text-white`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
