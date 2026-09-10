import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.era-residence.com"),
  title: "Sagar Residence — Contemporary Mediterranean Residences in Estepona | Sagarithm",
  description:
    "Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona.",
  icons: {
    icon: [
      { url: "/assets/6a068e9190b0417295a747e4_fav_512x512.png", sizes: "32x32" },
      { url: "/assets/6a068e91bb279e3f7fc5b425_fav_512x512.png", sizes: "48x48" },
      { url: "/assets/6a068e91270853940feb77b8_fav_512x512.png", sizes: "192x192" },
      { url: "/assets/6a068e912ba75edec03d31d4_fav_512x512.png", sizes: "512x512" },
    ],
    apple: [
      { url: "/assets/6a068e918b1760d249c9955e_fav_512x512.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "ERA Residence — Contemporary Mediterranean Residences in Estepona",
    description:
      "Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona.",
    images: ["/assets/6a39f0aba46d0d055c0476ff_open-graph.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-wf-domain="www.era-residence.com"
      data-wf-page="6a068da7ad91b057365bf968"
      data-wf-site="6a068da7ad91b057365bf967"
      className="w-mod-js"
    >
      <head>
        {/* Google Fonts Luxury Fallbacks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Adobe Typekit for Ambroise Francois Std, Sloop Script Three, Maison Neue Extended */}
        <Script
          src="https://use.typekit.net/pig8glj.js"
          strategy="beforeInteractive"
        />
        <Script id="typekit-init" strategy="beforeInteractive">
          {`try{Typekit.load();}catch(e){}`}
        </Script>
      </head>
      <body className="body" data-barba="wrapper">
        {children}

        {/* Runtime scripts in exact dependency order */}
        <Script src="/assets/jquery.min.js" strategy="afterInteractive" />
        <Script src="/assets/webflow.js" strategy="afterInteractive" />
        <Script src="/assets/barba.min.js" strategy="afterInteractive" />
        <Script src="/assets/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/SplitText.min.js" strategy="afterInteractive" />
        <Script src="/assets/CustomEase.min.js" strategy="afterInteractive" />
        <Script src="/assets/lenis.min.js" strategy="afterInteractive" />
        <Script src="/assets/lottie.min.js" strategy="afterInteractive" />
        <Script src="/assets/bundle.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
