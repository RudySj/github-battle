import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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

                {repos[language] && <pre>{JSON.stringify(repos[language], null, 2)}</pre>}
            </React.Fragment>
        )
    }
}