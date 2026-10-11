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
  title: "trouser wallets — papertrouser_ Edition 001",
  description:
    "The 79 wallets that collected the sold-out papertrouser_ Edition 001.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer>
          <div className="footer-brand">
            <span className="wordmark">papertrouser_</span>
            <p>A permanent record of the first edition.</p>
          </div>
          <p className="footer-disclaimer">
            Fan-made site. Not affiliated with, endorsed by, or operated by
            papertrade. Wallet data is compiled from public on-chain records;
            we are not responsible for its accuracy or completeness.
          </p>
          <div className="payment">
            <span>HyperCore USDC recipient</span>
            <a
              href="https://app.hyperliquid.xyz/explorer/address/0x8de06c06ab675bb0bc45644d41768b76869dd376"
              target="_blank"
              rel="noreferrer"
            >
              0x8de06c06ab675bb0bc45644d41768b76869dd376 ↗
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
