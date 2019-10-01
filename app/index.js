import React from 'react'
import ReactDOM from 'react-dom'
// Add css to be active in the component
import './index.css'
import Popular from './components/Popular'

// Aspects of the components
// State 
// Lifecycle
// UI

// Why isn't ReactDOM part of the core of react? 
//   - individuals might want to run this code into other 
//     environemnts. (IOS, Andriod, xbox). 

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

ReactDOM.render(
    // 2 arguments
    // React Element
    // Where to render the element to
    <App />,
    document.getElementById('app')
)