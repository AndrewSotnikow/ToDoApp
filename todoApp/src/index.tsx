import * as React from 'react'
import ReactDOM from 'react-dom/client'

function Test() {
    return <h1>Hello from React!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Test />)
