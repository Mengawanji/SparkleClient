import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './Navbar';
import { Footer } from './footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CleanHome Services - Professional Home Cleaning',
  description: 'Book professional home cleaning services with transparent pricing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}