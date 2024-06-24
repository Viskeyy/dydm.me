import { GlobalFooter } from '@/components/GlobalFooter';
import { GlobalHeader } from '@/components/GlobalHeader';
import { Index } from '@/components/StarryParticles';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'dydm.me',
    description: 'Personal Blog',
    icons: '/home.svg',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} dark p-24 pb-0`}>
                <Index />
                <GlobalHeader />
                {children}
                <GlobalFooter />
            </body>
        </html>
    );
}
