import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './repositories.module.scss'
import cardStyles from '@/styles/pages/popular.module.scss'
import {LoadingSpinner} from "@/components";

interface RepositoriesProps {
    userId: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    id: number;
    clone_url: string;
    name: string;
    description: string;
}


const Repositories: React.FC<RepositoriesProps> = ({userId}) => {
    const [repositories, setRepositories] = useState<RepositoriesProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('');
    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${userId}/repos`);
                setRepositories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [userId]);

    const filterByMostForks = () => {
        return repositories.sort((a, b) => b.forks_count - a.forks_count);
    };

    const filterByMostStars = () => {
        return repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
    };

    const filterByLastUpdate = () => {
        return repositories.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    };

    const handleFilterClick = (filterType: string) => {
        setFilterType(filterType);
    };

    let filteredRepositories;
    if (filterType === 'forks') {
        filteredRepositories = filterByMostForks();
    } else if (filterType === 'stars') {
        filteredRepositories = filterByMostStars();
    } else if (filterType === 'lastupdate') {
        filteredRepositories = filterByLastUpdate();
    } else {
        filteredRepositories = repositories;
    }



    return (
        <div className={`${styles.repositoriesWrapper} relative h-100`}>
            <h2 className={styles.repositoriesTitle}>{userId} Repositories:</h2>
            <div style={{display: loading ? 'block' : 'none'}}
                 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoadingSpinner/>
            </div>
            <div style={{display: loading ? 'none' : 'block'}}>
                <div>
                    <span className="text-gray-500">sort by:</span>
                    <button onClick={() => handleFilterClick('forks')}
                            className="px-2 ml-2 py-1  text-gray-300 rounded hover:bg-gray-700 focus:outline-none focus:ring"
                    >Most Forks
                    </button>
                    <button onClick={() => handleFilterClick('stars')}
                            className="px-2 ml-2 py-1  text-gray-300 rounded hover:bg-gray-700 focus:outline-none focus:ring"
                    >Most Stars
                    </button>
                    <button onClick={() => handleFilterClick('lastupdate')}
                            className="px-2 ml-2 py-1  text-gray-300 rounded hover:bg-gray-700 focus:outline-none focus:ring"
                    >Last Update
                    </button>
                </div>
                <ul className={cardStyles.repositoriesList}>
                    {filteredRepositories.map((repo) => {
                        return (<li className={cardStyles.repositoriesListItem} key={repo.id}>
                            <a href={repo.clone_url} className={cardStyles.repositoriesListItemLink}>{repo.name}</a>
                            {repo.description && (<p className={cardStyles.repositoriesListItemDescription}>
                                {repo.description}
                            </p>)}
                            {repo.stargazers_count > 0 && (<span className={cardStyles.repositoriesListItemStarCounts}>
                            {repo.stargazers_count}
                        </span>)}

                        </li>)
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Repositories;
