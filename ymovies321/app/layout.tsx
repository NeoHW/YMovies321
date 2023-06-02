import type { Metadata } from 'next';

// These styles apply to every route in the application
import './globals.css';

export const metadata: Metadata = {
  title: 'YMovies321',
  description: 'Community of Movie Lovers - find, Review and discuss your favourite films!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}