import React from 'react'
import PropTypes from 'prop-types'

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
            language: 'All'
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(language) {
        this.setState({
            language
        })
    }

    render() {
        return (
            <LanguagesNav
                selectedLanguage={this.state.language}
                onUpdateLanguage={this.updateLanguage}
            />
        )
    }
}