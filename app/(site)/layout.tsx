
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "../globals.css";

// FONTS
const junicodeCondensed = localFont({ 
  src: [
    {
      path: '../../public/fonts/junicode-regularcondensed-webfont.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/junicode-boldcondensed-webfont.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-junicode-condensed',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: "Maroon/z",
  description: "Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={`bg-black ${junicodeCondensed.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
