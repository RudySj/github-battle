import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LanguagesNav({ selectedLanguage, onUpdateLanguage }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='flex-center'>
            {languages.map(language => (
                <li key={language}>
                    <button
                        className='btn-clear nav-link'
                        style={language === selectedLanguage ? { color: 'red' } : null}
                        onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}


function repoCard(repos) {
    console.log(repos);
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { id, name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                const { avatar_url, login } = owner;
                return (
                    <li key={id} className='repo bg-light'>
                        <h4 className='header-lg center-text'>
                            #{index + 1}
                        </h4>
                        <img
                            className='avatar'
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>{login}</a>
                        </h2>
                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )

}


export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'All',
            repos: {},
            error: null,
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.language);
    }

    updateLanguage(language) {
        this.setState({
            language,
            error: null,
        })
        if (!this.state.repos[language]) {
            fetchPopularRepos(language)
                .then(data => {
                    this.setState(({ language, repos }) => ({
                        repos: {
                            ...repos,
                            [language]: data,
                        }
                    }))
                })
                .catch((error) => {
                    console.warn('Error fetching repos: ', error);
                    this.setState({
                        error: 'There was a problem fetching the repositories.'
                    })
                })
        }
    }

    isLoading() {
        const { language, repos, error } = this.state;
        return !repos[language] && error === null;
    }

    render() {
        const { language, repos, error } = this.state;

        return (
            <React.Fragment>
                <LanguagesNav
                    selectedLanguage={language}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>Loading...</p>}

                {error && <p>{error}</p>}

                {console.log(repos[language])}

                {repos[language] && repoCard(repos[language])}
            </React.Fragment>
        )
    }
}