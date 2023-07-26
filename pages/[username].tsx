import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import Image from "next/image";
import {LoadingSpinner, Repositories} from '@/components/index';
import styles from '@/styles/pages/username.module.scss'
import Link from "next/link";

// userId: string;
// id: number;
// name: string;
// avatar_url: string;
// public_repos: number;
// followers: number;
// following: number;
// login: string;
interface UserProfileProps {
    userId: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    id: number;
    clone_url: string;
    name: string;
    description: string
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    login: string;
}


const UserProfile: React.FC<UserProfileProps> = () => {
    const router = useRouter();
    const {username} = router.query as { username: string };
    const [userData, setUserData] = useState<UserProfileProps | null>(null);
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
        <>
            <div className={styles.userInfoWrapper}>
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
                        <Repositories
                            userId={username}
                            forks_count={userData.forks_count}
                            stargazers_count={userData.stargazers_count}
                            updated_at={userData.updated_at}
                            id={userData.id}
                            clone_url={userData.clone_url}
                            name={userData.name}
                            description={userData.description}/>
                    </section>
                </section>
            </div>
        </>
    );
};

export default UserProfile;
