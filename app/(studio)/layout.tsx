import type { Metadata } from "next";
import '../globals.css';

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
    >
      <body>
        {children}
      </body>
    </html>
  );
}