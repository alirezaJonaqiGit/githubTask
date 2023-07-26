import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import Image from "next/image";
import {LoadingSpinner, Repositories} from '@/components/index';
import styles from '@/styles/pages/username.module.scss'
import Link from "next/link";

const UserProfile = () => {
    const router = useRouter();
    const {username} = router.query;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            // Define the GitHub API endpoint URL for user data
            const apiUrl = `https://api.github.com/users/${username}`;

            // Fetch user data from GitHub API
            axios
                .get(apiUrl)
                .then((response) => {
                    setUserData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching GitHub user data:', error);
                    setLoading(false);
                });
        }
    }, [username]);

    if (loading) {
        return (
            <div className={styles.fullPageLoadingWrapper}>
                <LoadingSpinner/>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={styles.userNotFoundWrapper}>
                <span className={styles.userNotFound__title}>{username} not found!</span>
                <Link className={styles.userNotFound__link} href='/'>
                    back to home
                </Link>
            </div>
        );
    }
    return (
        <section className={styles.userInfoWrapper}>
            <section className={styles.userInfo}>
                <aside className={styles.userInfo__card}>
                    <div className={styles.userInfo__stickTop}>
                        <div className={styles.userInfo__cardAvatarWrapper}>
                            <Image src={userData.avatar_url} className={styles.userInfo__cardAvatar} width={100}
                                   height={100} alt={userData.name + ' github profile'}/>
                            <div className={styles.userInfo__cardUserNameWrapper}>
                                <h1 className={styles.userInfo__cardUserName}>{userData.name}</h1>
                                <span className={styles.userInfo__cardUserId}>{userData.login}</span>
                            </div>
                        </div>
                        <p className="mt-2">{userData.public_repos} public repositories</p>
                        <p>{userData.followers} Followers . {userData.following} Following</p>
                    </div>
                </aside>
                <section className={styles.userInfo__repositoriesWrapper}>
                    <Repositories userId={username}/>
                </section>
            </section>
        </section>
    );
};

export default UserProfile;
