import 'normalize.css';
import '@/styles/app.scss'
import '@/app/global.css'
import {Header} from "@/components";

export default function App({Component, pageProps}) {
    return (
        <>
            <Header/>
            <Component {...pageProps} />
        </>
    );
}