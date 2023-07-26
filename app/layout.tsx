import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './global.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'users github repository',
    description: 'input user names',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
