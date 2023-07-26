import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '@/styles/pages/popular.module.scss'
import cardStyles from "@/styles/pages/popular.module.scss";
import loadingStyles from "@/styles/pages/username.module.scss"
import {Header, LoadingSpinner} from "@/components";

interface Repository {
    name: string;
    id: number;
    html_url: string;
    description: string;
    stargazers_count: number;
}
const GitHubPopularRepositories: React.FC = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularRepositories = async () => {
            try {
                const response = await axios.get('https://api.github.com/search/repositories', {
                    params: {
                        q: 'stars:>1',
                        sort: 'stars',
                        per_page: 10,
                    },
                });
                setLoading(false);
                const data = response.data;
                setRepositories(data.items);
                setFilteredRepositories(data.items);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching popular repositories:', error);
            }
        };

        fetchPopularRepositories();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setInputValue(input);
        filterRepositories(input);
    };

    const filterRepositories = (input: string) => {
        if (!input) {
            setFilteredRepositories(repositories);
        } else {
            if (input.length > 2) {
                const filtered = repositories.filter((repo) =>
                    repo.name.toLowerCase().includes(input.toLowerCase())
                );
                setFilteredRepositories(filtered);
            }
        }
    };

    if (loading) {
        return (
            <div className={loadingStyles.fullPageLoadingWrapper}>
                <LoadingSpinner/>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.popularReposWrapper}>

                <h1 className={styles.popularReposTitle}>Top 10 Most Popular GitHub Repositories</h1>
                <input
                    className={styles.popularReposFilterInput}
                    type="text"
                    placeholder="Filter repositories..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <p style={{display: filteredRepositories.length > 0 ? 'none' : 'block'}}
                   className={styles.nothingWasFound}>
                    nothing was found!
                </p>
                <ul className={styles.repositoriesList}>
                    {filteredRepositories.map((repo) => (
                        <li className={styles.repositoriesListItem} key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                               className={styles.repositoriesListItemLink}>
                                {repo.name}
                            </a>
                            <p className={styles.repositoriesListItemDescription}>{repo.description}</p>
                            {repo.stargazers_count > 0 && (<span className={styles.repositoriesListItemStarCounts}>
                            {repo.stargazers_count}
                        </span>)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GitHubPopularRepositories;
