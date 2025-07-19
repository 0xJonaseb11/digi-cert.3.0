import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import ClientProviders from "./client-providers";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "DIGICERT - Blockchain Certificates",
  description: "Secure digital certificates powered by blockchain technology",
  keywords: "blockchain, certificates, digital credentials, certification, verification",
  openGraph: {
    title: "DIGICERT | Blockchain Certificates",
    description: "Secure digital certificates powered by blockchain technology",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIGICERT | Blockchain Certificates",
    description: "Secure digital certificates powered by blockchain technology",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} min-h-screen`}>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <ClientProviders>
          {/* <DebugWallets /> */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
