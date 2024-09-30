import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

// FONTS
const junicodeCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/junicode-regularcondensed-webfont.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/junicode-boldcondensed-webfont.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-junicode-condensed",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Maroon/z",
  description:
    "Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora.",
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
      <head>
        <title>Maroon/z</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content="Maroon/z" />
        <meta name="twitter:title" content="Maroon/z" />
        <meta itemProp="name" content="Maroon/z" />
        <meta name="application-name" content="Maroon/z" />
        <meta name="og:site_name" content="Maroon/z" />
        {/* <link
          rel="icon"
          type="image/png"
          href="https://trentkim.space/favicon.png"
        /> */}
        {/* <meta property="og:image" href="" /> */}
        <meta property="og:image:secure_url" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora."
        />
        <meta
          property="og:description"
          content="Maroon/z is a research-based archive, indexing alternative futures for Queer(ed) folx in the African Diaspora."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <link rel="canonical" href="" />
        <meta name="theme-color" content="#F5F5F5" />
        <meta property="og:image:alt" content="Maroon/z" />
        <meta name="robots" content="index,follow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
