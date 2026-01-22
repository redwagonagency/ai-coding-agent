import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Red Wagon Agency - Growth Marketing & Digital Solutions',
  description: 'Transform your business with Red Wagon Agency\'s expert digital marketing, web development, and growth strategies. Drive results with data-driven solutions.',
  keywords: 'digital marketing, web development, SEO, growth marketing, PPC, social media marketing, conversion optimization',
  authors: [{ name: 'Red Wagon Agency' }],
  creator: 'Red Wagon Agency',
  publisher: 'Red Wagon Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://redwagon.agency'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Red Wagon Agency - Growth Marketing & Digital Solutions',
    description: 'Transform your business with expert digital marketing and web development services. Drive growth with data-driven strategies.',
    url: 'https://redwagon.agency',
    siteName: 'Red Wagon Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Red Wagon Agency - Digital Marketing Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Wagon Agency - Growth Marketing & Digital Solutions',
    description: 'Transform your business with expert digital marketing and web development services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Red Wagon Agency",
              "url": "https://redwagon.agency",
              "logo": "https://redwagon.agency/logo.png",
              "description": "Digital marketing and web development agency specializing in growth marketing and data-driven solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-0123",
                "contactType": "customer service",
                "email": "hello@redwagon.agency"
              },
              "sameAs": [
                "https://twitter.com/redwagonagency",
                "https://linkedin.com/company/redwagonagency",
                "https://facebook.com/redwagonagency"
              ],
              "service": [
                {
                  "@type": "Service",
                  "name": "Digital Marketing",
                  "description": "Comprehensive digital marketing strategies including SEO, PPC, and social media marketing."
                },
                {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom web development and e-commerce solutions built for performance and conversion."
                },
                {
                  "@type": "Service",
                  "name": "Growth Marketing",
                  "description": "Data-driven growth strategies to scale your business and increase revenue."
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}