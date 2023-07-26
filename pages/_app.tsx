import { AppProps } from 'next/app';
import 'normalize.css';
import '@/styles/app.scss'
import '@/app/global.css'
import {Header} from "@/components";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}