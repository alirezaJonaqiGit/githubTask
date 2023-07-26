import React from 'react';
import Link from "next/link";
import style from './header.module.scss';

const Header = () => {
    return (
        <header className={style.mainHeader}>
            <div className="wrapper">
                <nav className={style.mainHeaderInner}>
                    <ul className={style.mainHeaderList}>
                        <li className={style.mainHeaderListItem}>
                            <Link href="/" className={style.link}>
                                home
                            </Link>
                        </li>
                        <li className={style.mainHeaderListItem}>
                            <Link href="/popular" className={style.link}>
                                Popular repos
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header
