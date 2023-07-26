import React from 'react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import styles from './hero.module.scss'

const Hero = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Push the input value into the router
        router.push(`/${searchValue}`);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <>
            <section className={styles.heroWrapper}>
                <section className="wrapper">
                    <div className={styles.hero}>
                        <h1 className={styles.heroTitle}>
                            access to github repositories!
                        </h1>
                        <div className={styles.hero__searchBar}>
                            <input
                                className={styles.hero__searchBarInput}
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle Enter key press
                                placeholder="Enter username"
                            />
                            <button className={styles.heroSearchBarAction} onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}
export default Hero

