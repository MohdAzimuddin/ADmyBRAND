// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'ADmyBRAND AI Suite - AI-Powered Marketing Automation',
    template: '%s | ADmyBRAND AI Suite',
  },
  description:
    'Transform your marketing with ADmyBRAND AI Suite. Generate high-converting content, automate campaigns, and predict performance with 92% accuracy—all in one platform.',
  keywords: [
    'AI marketing',
    'marketing automation',
    'content generation',
    'campaign optimization',
    'ADmyBRAND',
  ],
  authors: [{ name: 'ADmyBRAND', url: 'https://admybrand.com' }],
  creator: 'ADmyBRAND',
  publisher: 'ADmyBRAND',
  metadataBase: new URL('https://admybrand.com'),
  openGraph: {
    title: 'ADmyBRAND AI Suite - AI-Powered Marketing Automation',
    description:
      'Transform your marketing with ADmyBRAND AI Suite. Generate high-converting content, automate campaigns, and predict performance with 92% accuracy—all in one platform.',
    url: 'https://admybrand.com',
    siteName: 'ADmyBRAND AI Suite',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ADmyBRAND AI Suite',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADmyBRAND AI Suite - AI-Powered Marketing Automation',
    description:
      'Transform your marketing with ADmyBRAND AI Suite. Generate high-converting content, automate campaigns, and predict performance with 92% accuracy—all in one platform.',
    images: ['/twitter-image.jpg'],
    creator: '@admybrand',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}





// // app/layout.tsx - Simplified version
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: 'ADmyBRAND AI Suite - Testing',
//   description: 'Testing Tailwind CSS setup',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   );
// }